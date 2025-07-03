const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

const Request = sequelize.define('Request', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  id_parent: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
  age_enfant: DataTypes.INTEGER,
  adresse: DataTypes.STRING,
  date_debut: DataTypes.DATEONLY,
  date_fin: DataTypes.DATEONLY,
  commentaires: DataTypes.TEXT,
  statut: DataTypes.ENUM('EN_COURS', 'ATTRIBUEE', 'TERMINEE', 'SUPPRIMEE'),
});

module.exports = Request;
