const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Pro = require('./pro');

const Subscription = sequelize.define('Subscription', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  id_pro: {
    type: DataTypes.INTEGER,
    references: {
      model: Pro,
      key: 'id',
    },
  },
  date_debut: DataTypes.DATEONLY,
  date_fin: DataTypes.DATEONLY,
  statut: DataTypes.ENUM('ACTIF', 'EXPIRE', 'EN_ATTENTE'),
});

module.exports = Subscription;
