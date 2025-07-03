const { Request } = require('../models');

exports.createRequest = async (req, res) => {
  try {
    const { age_enfant, adresse, date_debut, date_fin, commentaires } = req.body;
    const reqObj = await Request.create({
      id_parent: req.user.id,
      age_enfant,
      adresse,
      date_debut,
      date_fin,
      commentaires,
      statut: 'EN_COURS',
    });
    res.status(201).json(reqObj);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMyRequests = async (req, res) => {
  try {
    const requests = await Request.findAll({ where: { id_parent: req.user.id } });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
