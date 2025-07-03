const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const auth = require('../middlewares/authMiddleware');

const router = express.Router();

router.post(
  '/register',
  [
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    body('role').optional().isIn(['PARENT', 'PRO']),
  ],
  authController.register
);

router.post(
  '/login',
  [body('email').isEmail(), body('password').notEmpty()],
  authController.login
);

router.post('/forgot-password', [body('email').isEmail()], authController.forgotPassword);
router.post(
  '/reset-password',
  [body('token').notEmpty(), body('password').isLength({ min: 6 })],
  authController.resetPassword
);

router.get('/me', auth, authController.getMe);

module.exports = router;
