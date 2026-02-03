const express = require('express');
const { getAllTeachers, getTeacherById, getTeachersByClass } = require('../controllers/teacherController');

const router = express.Router();

// Get all teachers
router.get('/', getAllTeachers);

// Get teacher by ID
router.get('/:id', getTeacherById);

// Get teachers by class
router.get('/class/:classId', getTeachersByClass);

module.exports = router;
