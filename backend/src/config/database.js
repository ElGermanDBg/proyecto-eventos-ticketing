const { Sequelize } = require('sequelize');
require('pg');
require('dotenv').config();

const isProduction = process.env.DB_HOST && !process.env.DB_HOST.includes('localhost');

const dbOptions = {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  logging: false
};

if (isProduction) {
  dbOptions.dialectOptions = {
    ssl: { require: true, rejectUnauthorized: false }
  };
}

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  dbOptions
);

module.exports = sequelize;
