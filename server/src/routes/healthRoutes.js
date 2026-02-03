const express = require('express');
const { healthCheck, databaseTest } = require('../controllers/healthController');

const router = express.Router();

// Health check endpoint
router.get('/health', healthCheck);

// Database test endpoint
router.get('/health/database', databaseTest);

module.exports = router;
