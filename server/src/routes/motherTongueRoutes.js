const express = require('express');
const { getAllMotherTongues, getMotherTongueById } = require('../controllers/motherTongueController');

const router = express.Router();

// Get all mother tongues
router.get('/', getAllMotherTongues);

// Get mother tongue by ID
router.get('/:id', getMotherTongueById);

module.exports = router;
