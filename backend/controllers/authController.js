const { validationResult } = require('express-validator');
const { User, Pro, PasswordResetToken } = require('../models');
const { hashPassword, comparePassword } = require('../utils/hash');
const { generateToken } = require('../utils/jwt');
const { sendResetEmail } = require('../utils/email');
const crypto = require('crypto');

exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { nom, prenom, email, password, role } = req.body;
    const finalRole = role || 'PARENT';
    if (finalRole === 'ADMIN') {
      return res.status(403).json({ message: 'Registration as ADMIN is forbidden' });
    }
    const hashed = await hashPassword(password);
    const user = await User.create({ nom, prenom, email, password: hashed, role: finalRole });
    if (finalRole === 'PRO') {
      await Pro.create({ id_user: user.id });
    }
    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const valid = await comparePassword(password, user.password);
    if (!valid) return res.status(400).json({ message: 'Invalid credentials' });
    const token = generateToken({ id: user.id, role: user.role });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'User not found' });
    const token = crypto.randomBytes(20).toString('hex');
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
    await PasswordResetToken.create({ userId: user.id, token, expiresAt });
    await sendResetEmail(email, token);
    res.json({ message: 'Reset email sent' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.resetPassword = async (req, res) => {
  const { token, password } = req.body;
  const record = await PasswordResetToken.findOne({ where: { token } });
  if (!record || record.expiresAt < new Date()) {
    return res.status(400).json({ message: 'Invalid token' });
  }
  try {
    const hashed = await hashPassword(password);
    await User.update({ password: hashed }, { where: { id: record.userId } });
    await record.destroy();
    res.json({ message: 'Password reset successful' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
