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
    await Pro.update(req.body, { where: { id } });
    res.json({ message: 'Professional updated' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
