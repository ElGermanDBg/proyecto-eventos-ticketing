// Punto de entrada para Vercel Serverless Functions
// Exporta la app Express como función serverless
try {
  const app = require('../src/app');
  module.exports = app;
} catch (error) {
  console.error('Error al cargar la aplicación:', error);
  // Exporta un handler mínimo para que Vercel no crashee sin información
  module.exports = (req, res) => {
    res.status(500).json({ 
      error: 'Error interno del servidor',
      message: error.message 
    });
  };
}
