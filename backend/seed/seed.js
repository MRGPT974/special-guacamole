const { sequelize, User, Pro, Request } = require('../models');
const { hashPassword } = require('../utils/hash');

async function seed() {
  await sequelize.sync({ force: true });

  const adminPass = await hashPassword('adminpass');
  const parentPass = await hashPassword('parentpass');
  const proPass = await hashPassword('propass');

  const admin = await User.create({ nom: 'Admin', prenom: 'Admin', email: 'admin@example.com', password: adminPass, role: 'ADMIN' });
  const parent = await User.create({ nom: 'Parent', prenom: 'Test', email: 'parent@example.com', password: parentPass, role: 'PARENT' });
  const proUser = await User.create({ nom: 'Pro', prenom: 'Test', email: 'pro@example.com', password: proPass, role: 'PRO' });

  const pro = await Pro.create({ id_user: proUser.id, type: 'ASSMAT', adresse: '1 rue de Paris', capacite: 3, description: 'Professionnel test', abonnement_actif: true });

  await Request.create({ id_parent: parent.id, age_enfant: 3, adresse: '1 rue de Lyon', date_debut: '2024-01-01', date_fin: '2024-06-01', commentaires: 'Besoin de garde', statut: 'EN_COURS' });

  console.log('Seed completed');
  await sequelize.close();
}

seed();
