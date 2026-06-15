const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');
const { verifyToken } = require('../middleware/auth');

// Todas las rutas de tickets requieren autenticación
router.use(verifyToken);

router.post('/comprar', ticketController.comprarTicket);
router.get('/mis-tickets', ticketController.misTickets);

module.exports = router;
