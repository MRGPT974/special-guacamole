const { User, Pro, Request, Subscription } = require('../models');

exports.getAllUsers = async (req, res) => {
  const { role } = req.query;
  const where = {};
  if (role && ['PARENT', 'PRO', 'ADMIN'].includes(role)) {
    where.role = role;
  }
  try {
    const users = await User.findAll({
      where,
      attributes: ['id', 'nom', 'prenom', 'email', 'role', 'createdAt'],
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur introuvable' });
    }

    if (user.role === 'PRO') {
      await Pro.destroy({ where: { id_user: id } });
    } else if (user.role === 'PARENT') {
      await Request.destroy({ where: { id_parent: id } });
    }

    await user.destroy();
    res.json({ message: 'Utilisateur supprimé' });
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
    const totalUsers = await User.count();
    const totalParents = await User.count({ where: { role: 'PARENT' } });
    const totalPros = await User.count({ where: { role: 'PRO' } });
    const totalAdmins = await User.count({ where: { role: 'ADMIN' } });
    const totalRequests = await Request.count();
    const activeSubscriptions = await Subscription.count({ where: { statut: 'ACTIF' } });

    res.json({
      totalUsers,
      totalParents,
      totalPros,
      totalAdmins,
      totalRequests,
      activeSubscriptions,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
