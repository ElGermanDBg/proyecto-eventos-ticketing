const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');

// Rate limiting específico para login
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // 5 intentos
  message: { error: 'Demasiados intentos de login, intente de nuevo en 15 minutos' }
});

// Middleware para validar el body
const validateRegistration = [
  body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
  body('email').isEmail().withMessage('Debe ser un email válido'),
  body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

router.post('/register', validateRegistration, authController.register);
router.post('/login', loginLimiter, authController.login);

module.exports = router;
