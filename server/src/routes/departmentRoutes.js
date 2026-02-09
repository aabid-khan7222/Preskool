const express = require('express');
const { getAllDepartments, getDepartmentById } = require('../controllers/departmentController');

const router = express.Router();

// GET /api/departments
router.get('/', getAllDepartments);

// GET /api/departments/:id
router.get('/:id', getDepartmentById);

module.exports = router;
