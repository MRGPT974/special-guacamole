const express = require('express');
const requestController = require('../controllers/requestController');
const auth = require('../middlewares/authMiddleware');
const role = require('../middlewares/roleMiddleware');

const router = express.Router();

router.post('/', auth, role('PARENT'), requestController.createRequest);
router.get('/me', auth, role('PARENT'), requestController.getMyRequests);

module.exports = router;
