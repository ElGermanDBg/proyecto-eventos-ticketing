const express = require('express');
const router = express.Router();
const eventoController = require('../controllers/eventoController');
const { verifyToken, isAdmin } = require('../middleware/auth');

// Rutas públicas
router.get('/', eventoController.getEventos);
router.get('/:id', eventoController.getEventoById);

// Rutas protegidas (sólo administrador)
router.post('/', verifyToken, isAdmin, eventoController.createEvento);
router.put('/:id', verifyToken, isAdmin, eventoController.updateEvento);
router.delete('/:id', verifyToken, isAdmin, eventoController.deleteEvento);

module.exports = router;
