const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

const Pro = sequelize.define('Pro', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  id_user: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
  type: DataTypes.ENUM('ASSMAT', 'MAM', 'STRUCTURE'),
  adresse: DataTypes.STRING,
  agrement_pdf: DataTypes.STRING,
  capacite: DataTypes.INTEGER,
  description: DataTypes.TEXT,
  abonnement_actif: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Pro;
