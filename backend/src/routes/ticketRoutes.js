const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');
const { verifyToken } = require('../middleware/auth');

router.use(verifyToken);
router.post('/comprar', ticketController.comprarTicket);
router.get('/mis-tickets', ticketController.misTickets);

module.exports = router;
