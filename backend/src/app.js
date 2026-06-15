const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const sequelize = require('./config/database');
const rateLimiter = require('./middleware/rateLimit');
require('dotenv').config();

const app = express();

// Middlewares Globales
app.use(express.json());
app.use(cors());
app.use(helmet()); // Seguridad OWASP (Headers)

// Rate Limiting Global
app.use('/api/', rateLimiter);

// Rutas
const authRoutes = require('./routes/authRoutes');
const eventoRoutes = require('./routes/eventoRoutes');
const ticketRoutes = require('./routes/ticketRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/eventos', eventoRoutes);
app.use('/api/tickets', ticketRoutes);

// Endpoint de prueba
app.get('/', (req, res) => {
  res.send('API funcionando correctamente');
});

// Sincronización de Base de Datos y arranque de Servidor
sequelize.sync({ force: false }) // En producción cambiar a false, o usar migraciones
  .then(() => {
    console.log('Modelos sincronizados con la base de datos');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Servidor ejecutándose en el puerto ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error al sincronizar la base de datos:', err);
  });

module.exports = app;
