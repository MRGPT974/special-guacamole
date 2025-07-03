const express = require('express');
const dashboardController = require('../controllers/dashboardController');
const auth = require('../middlewares/authMiddleware');
const role = require('../middlewares/roleMiddleware');

const router = express.Router();

router.get('/parent', auth, role('PARENT'), dashboardController.parentDashboard);
router.get('/pro', auth, role('PRO'), dashboardController.proDashboard);
router.get('/pro/match', auth, role('PRO'), dashboardController.proMatch);

module.exports = router;
