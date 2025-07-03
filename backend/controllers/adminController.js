const { User, Pro, Request } = require('../models');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await User.destroy({ where: { id } });
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.blockPro = async (req, res) => {
  const { id } = req.params;
  try {
    await Pro.update({ abonnement_actif: false }, { where: { id } });
    res.json({ message: 'Professional blocked' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getStats = async (req, res) => {
  try {
    const users = await User.count();
    const pros = await Pro.count({ where: { abonnement_actif: true } });
    const requests = await Request.count({ where: { statut: 'EN_COURS' } });
    res.json({ users, pros_actifs: pros, demandes_en_cours: requests });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
