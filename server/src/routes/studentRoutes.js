const express = require('express');
const { 
  getAllStudents, 
  getStudentById, 
  getStudentsByClass, 
  createStudent,
  updateStudent
} = require('../controllers/studentController');

const router = express.Router();

// Debug middleware to log all requests
router.use((req, res, next) => {
  console.log(`[DEBUG] ${req.method} ${req.path} - ${new Date().toISOString()}`);
  next();
});

// Get all students
router.get('/', getAllStudents);

// Get students by class (specific route before parameterized route)
router.get('/class/:classId', getStudentsByClass);

// Get student by ID (parameterized route)
router.get('/:id', getStudentById);

// Create new student
router.post('/', createStudent);

// Update student
router.put('/:id', updateStudent);

module.exports = router;
