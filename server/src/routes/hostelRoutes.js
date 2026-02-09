const express = require('express');
const { getAllHostels, getHostelById } = require('../controllers/hostelController');

const router = express.Router();

// Get all hostels
router.get('/', getAllHostels);

// Get hostel by ID
router.get('/:id', getHostelById);

module.exports = router;
