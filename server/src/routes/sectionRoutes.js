const express = require('express');
const { getAllSections, getSectionById, getSectionsByClass } = require('../controllers/sectionController');

const router = express.Router();

// Get all sections
router.get('/', getAllSections);

// Get section by ID
router.get('/:id', getSectionById);

// Get sections by class
router.get('/class/:classId', getSectionsByClass);

module.exports = router;
