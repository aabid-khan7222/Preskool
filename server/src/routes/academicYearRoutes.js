const express = require('express');
const { getAllAcademicYears, getAcademicYearById } = require('../controllers/academicYearController');

const router = express.Router();

// Get all academic years (for dropdowns)
router.get('/', getAllAcademicYears);

// Get academic year by ID
router.get('/:id', getAcademicYearById);

module.exports = router;
