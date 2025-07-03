const express = require('express');
const requestController = require('../controllers/requestController');
const auth = require('../middlewares/authMiddleware');
const role = require('../middlewares/roleMiddleware');

const { param, validationResult } = require('express-validator');

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

router.post('/', auth, role('PARENT'), requestController.createRequest);
router.get('/', auth, role('PRO'), requestController.getOpenRequests);
router.get('/me', auth, role('PARENT'), requestController.getMyRequests);
router.delete('/:id', auth, role('PARENT'), validateId, requestController.deleteRequest);

module.exports = router;
