const Ticket = require('../models/Ticket');
const Evento = require('../models/Evento');
const { v4: uuidv4 } = require('uuid');

exports.comprarTicket = async (req, res) => {
  try {
    const { evento_id } = req.body;
    const usuario_id = req.usuario.id;

    const evento = await Evento.findByPk(evento_id);
    if (!evento) {
      return res.status(404).json({ error: 'Evento no encontrado' });
    }

    const ticketsVendidos = await Ticket.count({ where: { evento_id, estado: 'activo' } });
    if (ticketsVendidos >= evento.capacidad) {
      return res.status(400).json({ error: 'El evento está agotado' });
    }

    const codigo_unico = `TKT-${uuidv4()}`;

    const nuevoTicket = await Ticket.create({
      usuario_id, evento_id, codigo_unico, estado: 'activo'
    });

    res.status(201).json({ message: 'Ticket comprado exitosamente', ticket: nuevoTicket });
  } catch (error) {
    res.status(500).json({ error: 'Error al comprar el ticket' });
  }
};

exports.misTickets = async (req, res) => {
  try {
    const usuario_id = req.usuario.id;
    const tickets = await Ticket.findAll({
      where: { usuario_id },
      include: [{ model: Evento, attributes: ['nombre', 'fecha', 'lugar', 'precio'] }]
    });
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los tickets' });
  }
};
