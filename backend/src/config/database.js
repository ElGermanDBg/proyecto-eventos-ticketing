const { Sequelize } = require('sequelize');
require('dotenv').config();

// Configuración de opciones de conexión según el entorno
const isProduction = process.env.DB_HOST && !process.env.DB_HOST.includes('localhost');

const dbOptions = {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  logging: false
};

// Neon.tech y otros servicios cloud requieren SSL
if (isProduction) {
  dbOptions.dialectOptions = {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  };
}

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  dbOptions
);

module.exports = sequelize;
