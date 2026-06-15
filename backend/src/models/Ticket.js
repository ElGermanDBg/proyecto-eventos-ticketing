const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./Usuario');
const Evento = require('./Evento');

const Ticket = sequelize.define('Ticket', {
  codigo_unico: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  estado: {
    type: DataTypes.STRING,
    defaultValue: 'activo' // activo, cancelado, usado
  }
});

// Relaciones
Usuario.hasMany(Ticket, { foreignKey: 'usuario_id' });
Ticket.belongsTo(Usuario, { foreignKey: 'usuario_id' });

Evento.hasMany(Ticket, { foreignKey: 'evento_id' });
Ticket.belongsTo(Evento, { foreignKey: 'evento_id' });

module.exports = Ticket;
