const { Op } = require('sequelize');
const { Request, Pro } = require('../models');

exports.parentDashboard = async (req, res) => {
  const { statut } = req.query;
  const where = { id_parent: req.user.id };
  if (statut && ['EN_COURS', 'ATTRIBUEE', 'TERMINEE', 'SUPPRIMEE'].includes(statut)) {
    where.statut = statut;
  }
  try {
    const requests = await Request.findAll({
      where,
      attributes: ['id', 'age_enfant', 'date_debut', 'date_fin', 'commentaires', 'statut'],
    });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.proDashboard = async (req, res) => {
  const { type, capacite, zone } = req.query;
  const where = { statut: 'EN_COURS' };
  if (type) {
    where.type = type;
  }
  if (capacite) {
    where.capacite = parseInt(capacite, 10);
  }
  if (zone) {
    where.adresse = { [Op.like]: `%${zone}%` };
  }
  try {
    const requests = await Request.findAll({ where });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.proMatch = async (req, res) => {
  try {
    const pro = await Pro.findOne({ where: { id_user: req.user.id } });
    if (!pro) {
      return res.status(404).json({ message: 'Pro not found' });
    }
    const where = { statut: 'EN_COURS', type: pro.type };
    const postal = pro.adresse && pro.adresse.match(/\d{5}/);
    if (postal) {
      where.adresse = { [Op.like]: `%${postal[0]}%` };
    }
    const requests = await Request.findAll({ where });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
