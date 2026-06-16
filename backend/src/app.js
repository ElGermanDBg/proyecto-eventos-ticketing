const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimiter = require('./middleware/rateLimit');
require('dotenv').config();

const app = express();

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || origin.match(/^http:\/\/localhost:\d+$/)) {
      return callback(null, true);
    }
    if (process.env.FRONTEND_URL && origin === process.env.FRONTEND_URL) {
      return callback(null, true);
    }
    callback(new Error('No permitido por CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(helmet());
app.use('/api/', rateLimiter);

const authRoutes = require('./routes/authRoutes');
const eventoRoutes = require('./routes/eventoRoutes');
const ticketRoutes = require('./routes/ticketRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/eventos', eventoRoutes);
app.use('/api/tickets', ticketRoutes);

app.get('/', (req, res) => {
  res.send('API funcionando correctamente');
});

let dbSynced = false;
const syncDatabase = async () => {
  if (!dbSynced) {
    try {
      const sequelize = require('./config/database');
      await sequelize.sync({ force: false });
      console.log('Base de datos sincronizada');
      dbSynced = true;
    } catch (err) {
      console.error('Error de base de datos:', err.message);
    }
  }
};

if (process.env.VERCEL) {
  syncDatabase();
} else {
  syncDatabase().then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Servidor en puerto ${PORT}`);
    });
  });
}

module.exports = app;
