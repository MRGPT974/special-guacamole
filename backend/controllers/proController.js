const { Pro, User } = require('../models');

exports.getAllPros = async (req, res) => {
  try {
    const pros = await Pro.findAll({ include: User });
    res.json(pros);
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
    await pro.update(req.body);
    res.json({ message: 'Professional updated' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
