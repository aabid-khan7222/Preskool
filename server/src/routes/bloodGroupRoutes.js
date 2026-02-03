const express = require('express');
const { getAllBloodGroups, getBloodGroupById } = require('../controllers/bloodGroupController');

const router = express.Router();

// Get all blood groups
router.get('/', getAllBloodGroups);

// Get blood group by ID
router.get('/:id', getBloodGroupById);

module.exports = router;
