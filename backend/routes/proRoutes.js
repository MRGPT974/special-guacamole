const express = require('express');
const { param, validationResult } = require('express-validator');
const proController = require('../controllers/proController');
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

router.get('/', proController.getAllPros);
router.get('/:id', validateId, proController.getProById);
router.put('/:id', auth, role('PRO', 'ADMIN'), validateId, proController.updatePro);

module.exports = router;
