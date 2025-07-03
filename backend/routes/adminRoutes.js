const express = require('express');
const adminController = require('../controllers/adminController');
const auth = require('../middlewares/authMiddleware');
const role = require('../middlewares/roleMiddleware');

const router = express.Router();

router.get('/users', auth, role('ADMIN'), adminController.getAllUsers);
router.delete('/users/:id', auth, role('ADMIN'), adminController.deleteUser);
router.put('/pros/:id/block', auth, role('ADMIN'), adminController.blockPro);
router.get('/stats', auth, role('ADMIN'), adminController.getStats);

module.exports = router;
