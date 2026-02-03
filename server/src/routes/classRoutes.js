const express = require('express');
const { getAllClasses, getClassById, getClassesByAcademicYear } = require('../controllers/classController');

const router = express.Router();

// Get all classes
router.get('/', getAllClasses);

// Get class by ID
router.get('/:id', getClassById);

// Get classes by academic year
router.get('/academic-year/:academicYearId', getClassesByAcademicYear);

module.exports = router;
