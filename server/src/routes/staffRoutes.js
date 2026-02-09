const express = require('express');
const { getAllStaff, getStaffById } = require('../controllers/staffController');

const router = express.Router();

// GET /api/staff
router.get('/', getAllStaff);

// GET /api/staff/:id
router.get('/:id', getStaffById);

module.exports = router;

