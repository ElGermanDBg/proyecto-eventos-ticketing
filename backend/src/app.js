const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimiter = require('./middleware/rateLimit');
require('dotenv').config();

const app = express();

// Configuración de CORS: restringe los orígenes permitidos según el entorno
const corsOptions = {
  origin: function (origin, callback) {
    // En desarrollo permitir localhost en cualquier puerto y peticiones sin origin (Postman, etc.)
    if (!origin || origin.match(/^http:\/\/localhost:\d+$/)) {
      return callback(null, true);
    }
    // En producción solo permitir el FRONTEND_URL configurado
    if (process.env.FRONTEND_URL && origin === process.env.FRONTEND_URL) {
      return callback(null, true);
    }
    callback(new Error('No permitido por CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

// Middlewares Globales
app.use(express.json());
app.use(cors(corsOptions));
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

// Endpoint de diagnóstico (para verificar la conexión a la DB)
app.get('/api/health', async (req, res) => {
  try {
    const sequelize = require('./config/database');
    await sequelize.authenticate();
    res.json({
      status: 'OK',
      database: 'Conectada',
      env: {
        DB_HOST: process.env.DB_HOST ? '✅ configurado' : '❌ falta',
        DB_NAME: process.env.DB_NAME ? '✅ configurado' : '❌ falta',
        DB_USER: process.env.DB_USER ? '✅ configurado' : '❌ falta',
        DB_PASSWORD: process.env.DB_PASSWORD ? '✅ configurado' : '❌ falta',
        JWT_SECRET: process.env.JWT_SECRET ? '✅ configurado' : '❌ falta',
        FRONTEND_URL: process.env.FRONTEND_URL || '❌ no configurado',
        VERCEL: process.env.VERCEL ? 'sí' : 'no'
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 'ERROR',
      database: 'Desconectada',
      error: err.message,
      env: {
        DB_HOST: process.env.DB_HOST ? '✅ configurado' : '❌ falta',
        DB_NAME: process.env.DB_NAME ? '✅ configurado' : '❌ falta',
        DB_USER: process.env.DB_USER ? '✅ configurado' : '❌ falta',
        DB_PASSWORD: process.env.DB_PASSWORD ? '✅ configurado' : '❌ falta'
      }
    });
  }
});

// Sincronización de Base de Datos (lazy: solo al primer request en serverless)
let dbSynced = false;
const syncDatabase = async () => {
  if (!dbSynced) {
    try {
      const sequelize = require('./config/database');
      await sequelize.sync({ force: false });
      console.log('Modelos sincronizados con la base de datos');
      dbSynced = true;
    } catch (err) {
      console.error('Error al sincronizar la base de datos:', err.message);
    }
  }
};

// En Vercel, sincronizar la DB al iniciar el módulo
if (process.env.VERCEL) {
  syncDatabase();
} else {
  // En local, sincronizar y arrancar el servidor
  syncDatabase().then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Servidor ejecutándose en el puerto ${PORT}`);
    });
  });
}

module.exports = app;
