const sequelize = require('../config/database');
const User = require('./user');
const Pro = require('./pro');
const Subscription = require('./subscription');
const Request = require('./request');
const PasswordResetToken = require('./passwordResetToken');

// Associations
Pro.belongsTo(User, { foreignKey: 'id_user' });
User.hasOne(Pro, { foreignKey: 'id_user' });

Subscription.belongsTo(Pro, { foreignKey: 'id_pro' });
Pro.hasMany(Subscription, { foreignKey: 'id_pro' });

Request.belongsTo(User, { as: 'parent', foreignKey: 'id_parent' });
User.hasMany(Request, { as: 'requests', foreignKey: 'id_parent' });

PasswordResetToken.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(PasswordResetToken, { foreignKey: 'userId' });

module.exports = {
  sequelize,
  User,
  Pro,
  Subscription,
  Request,
  PasswordResetToken,
};
