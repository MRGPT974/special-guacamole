const { Pro, User } = require('../models');

exports.getAllPros = async (req, res) => {
  try {
    const pros = await Pro.findAll({
      where: { abonnement_actif: true },
      include: [{ model: User, attributes: { exclude: ['password'] } }],
    });
    res.json(pros);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProById = async (req, res) => {
  const { id } = req.params;
  try {
    const pro = await Pro.findOne({
      where: { id, abonnement_actif: true },
      include: [{ model: User, attributes: { exclude: ['password'] } }],
    });
    if (!pro) {
      return res.status(404).json({ message: 'Pro not found' });
    }
    res.json(pro);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updatePro = async (req, res) => {
  const { id } = req.params;
  try {
    const pro = await Pro.findByPk(id);
    if (!pro) {
      return res.status(404).json({ message: 'Pro not found' });
    }
    if (req.user.role === 'PRO' && pro.id_user !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    const allowedFields = ['description', 'adresse', 'capacite', 'type', 'agrement_pdf'];
    const updateData = {};
    for (const key of allowedFields) {
      if (req.body[key] !== undefined) {
        updateData[key] = req.body[key];
      }
    }
    await pro.update(updateData);
    res.json({ message: 'Professional updated' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
