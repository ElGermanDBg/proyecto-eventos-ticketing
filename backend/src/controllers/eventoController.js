const Evento = require('../models/Evento');

// Obtener todos los eventos
exports.getEventos = async (req, res) => {
  try {
    const eventos = await Evento.findAll();
    res.json(eventos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los eventos' });
  }
};

// Obtener evento por ID
exports.getEventoById = async (req, res) => {
  try {
    const evento = await Evento.findByPk(req.params.id);
    if (!evento) return res.status(404).json({ error: 'Evento no encontrado' });
    res.json(evento);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el evento' });
  }
};

// Crear evento (Protegido / Admin)
exports.createEvento = async (req, res) => {
  try {
    const nuevoEvento = await Evento.create(req.body);
    res.status(201).json(nuevoEvento);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el evento' });
  }
};

// Actualizar evento (Protegido / Admin)
exports.updateEvento = async (req, res) => {
  try {
    const evento = await Evento.findByPk(req.params.id);
    if (!evento) return res.status(404).json({ error: 'Evento no encontrado' });

    await evento.update(req.body);
    res.json(evento);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el evento' });
  }
};

// Eliminar evento (Protegido / Admin)
exports.deleteEvento = async (req, res) => {
  try {
    const evento = await Evento.findByPk(req.params.id);
    if (!evento) return res.status(404).json({ error: 'Evento no encontrado' });

    await evento.destroy();
    res.json({ message: 'Evento eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el evento' });
  }
};
