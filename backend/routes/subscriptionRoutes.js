const express = require('express');
const subscriptionController = require('../controllers/subscriptionController');
const auth = require('../middlewares/authMiddleware');
const role = require('../middlewares/roleMiddleware');

const router = express.Router();

router.post('/subscribe', auth, role('PRO'), subscriptionController.subscribe);
router.get('/subscriptions/me', auth, role('PRO'), subscriptionController.getMySubscription);

module.exports = router;
