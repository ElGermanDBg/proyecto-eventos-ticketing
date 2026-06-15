const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Evento = sequelize.define('Evento', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false
  },
  lugar: {
    type: DataTypes.STRING,
    allowNull: false
  },
  capacidad: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  precio: {
    type: DataTypes.DECIMAL,
    allowNull: false
  }
});

module.exports = Evento;
