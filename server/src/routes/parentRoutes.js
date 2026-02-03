const express = require('express');
const { getAllParents, getParentById, getParentByStudentId, createParent, updateParent } = require('../controllers/parentController');

const router = express.Router();

// Get all parents
router.get('/', getAllParents);

// Create new parent
router.post('/', createParent);

// Get parent by ID
router.get('/:id', getParentById);

// Update parent by ID
router.put('/:id', updateParent);

// Get parent by student ID
router.get('/student/:studentId', getParentByStudentId);

module.exports = router;
