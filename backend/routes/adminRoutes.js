const express = require('express');
const { param, validationResult } = require('express-validator');
const adminController = require('../controllers/adminController');
const auth = require('../middlewares/authMiddleware');
const role = require('../middlewares/roleMiddleware');

const validateId = [
  param('id').isInt({ gt: 0 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const router = express.Router();

router.get('/users', auth, role('ADMIN'), adminController.getAllUsers);
router.delete('/users/:id', auth, role('ADMIN'), validateId, adminController.deleteUser);
router.put('/pros/:id/block', auth, role('ADMIN'), validateId, adminController.blockPro);
router.get('/stats', auth, role('ADMIN'), adminController.getStats);

module.exports = router;
