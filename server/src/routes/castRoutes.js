const express = require('express');
const { getAllCasts, getCastById } = require('../controllers/castController');

const router = express.Router();

// Get all casts
router.get('/', getAllCasts);

// Get cast by ID
router.get('/:id', getCastById);

module.exports = router;
