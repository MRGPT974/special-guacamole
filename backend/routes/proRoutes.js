const express = require('express');
const proController = require('../controllers/proController');
const auth = require('../middlewares/authMiddleware');
const role = require('../middlewares/roleMiddleware');

const router = express.Router();

router.get('/', auth, proController.getAllPros);
router.put('/:id', auth, role('PRO', 'ADMIN'), proController.updatePro);

module.exports = router;
