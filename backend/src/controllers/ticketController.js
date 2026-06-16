const Ticket = require('../models/Ticket');
const Evento = require('../models/Evento');
const { v4: uuidv4 } = require('uuid');

// Comprar un ticket
exports.comprarTicket = async (req, res) => {
  try {
    const { evento_id } = req.body;
    const usuario_id = req.usuario.id;

    // Verificar si el evento existe
    const evento = await Evento.findByPk(evento_id);
    if (!evento) {
      return res.status(404).json({ error: 'Evento no encontrado' });
    }

    // Verificar capacidad
    const ticketsVendidos = await Ticket.count({ where: { evento_id, estado: 'activo' } });
    if (ticketsVendidos >= evento.capacidad) {
      return res.status(400).json({ error: 'El evento está agotado' });
    }

    // Generar código único para el ticket usando UUID v4
    const codigo_unico = `TKT-${uuidv4()}`;

    const nuevoTicket = await Ticket.create({
      usuario_id,
      evento_id,
      codigo_unico,
      estado: 'activo'
    });

    res.status(201).json({
      message: 'Ticket comprado exitosamente',
      ticket: nuevoTicket
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al comprar el ticket' });
  }
};

// Obtener tickets del usuario autenticado
exports.misTickets = async (req, res) => {
  try {
    const usuario_id = req.usuario.id;
    
    const tickets = await Ticket.findAll({
      where: { usuario_id },
      include: [
        { model: Evento, attributes: ['nombre', 'fecha', 'lugar', 'precio'] }
      ]
    });

    res.json(tickets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los tickets' });
  }
};
