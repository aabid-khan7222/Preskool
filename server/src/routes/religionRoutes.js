const express = require('express');
const { getAllReligions, getReligionById } = require('../controllers/religionController');

const router = express.Router();

// Get all religions
router.get('/', getAllReligions);

// Get religion by ID
router.get('/:id', getReligionById);

module.exports = router;
