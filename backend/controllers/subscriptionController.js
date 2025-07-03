const { Pro, Subscription } = require('../models');

exports.subscribe = async (req, res) => {
  try {
    const pro = await Pro.findOne({ where: { id_user: req.user.id } });
    if (!pro) {
      return res.status(404).json({ message: 'Pro not found' });
    }
    const now = new Date();
    const end = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
    const subscription = await Subscription.create({
      id_pro: pro.id,
      date_debut: now,
      date_fin: end,
      statut: 'ACTIF',
    });
    await pro.update({ abonnement_actif: true });
    res.status(201).json(subscription);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMySubscription = async (req, res) => {
  try {
    const pro = await Pro.findOne({ where: { id_user: req.user.id } });
    if (!pro) {
      return res.status(404).json({ message: 'Pro not found' });
    }
    const subscription = await Subscription.findOne({
      where: { id_pro: pro.id, statut: 'ACTIF' },
      order: [['date_fin', 'DESC']],
    });
    if (!subscription) {
      return res.status(404).json({ message: 'No active subscription' });
    }
    res.json(subscription);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
