const express = require('express');
const { getAllSubjects, getSubjectById, getSubjectsByClass } = require('../controllers/subjectController');

const router = express.Router();

// Get all subjects
router.get('/', getAllSubjects);

// Get subject by ID
router.get('/:id', getSubjectById);

// Get subjects by class
router.get('/class/:classId', getSubjectsByClass);

module.exports = router;
