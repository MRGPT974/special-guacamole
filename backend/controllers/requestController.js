const { Request } = require('../models');


exports.createRequest = async (req, res) => {
  try {
    const {
      age_enfant,
      adresse,
      date_debut,
      date_fin,
      commentaires,
      type,
      capacite,
    } = req.body;

    const reqObj = await Request.create({
      id_parent: req.user.id,
      age_enfant,
      adresse,
      date_debut,
      date_fin,
      commentaires,
      type,
      capacite,
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

exports.getOpenRequests = async (req, res) => {
  try {
    const requests = await Request.findAll({ where: { statut: 'EN_COURS' } });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteRequest = async (req, res) => {
  const { id } = req.params;
  try {
    const request = await Request.findByPk(id);
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }
    if (request.id_parent !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    await request.destroy();
    res.json({ message: 'Request deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
