const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Límite de 100 peticiones por IP por ventana de tiempo
  message: { error: 'Demasiadas peticiones desde esta IP, por favor intente de nuevo en 15 minutos' }
});

module.exports = limiter;
