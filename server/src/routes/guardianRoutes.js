const express = require('express');
const { getAllGuardians, getGuardianById, getGuardianByStudentId } = require('../controllers/guardianController');

const router = express.Router();

// Get all guardians
router.get('/', getAllGuardians);

// Get guardian by ID
router.get('/:id', getGuardianById);

// Get guardian by student ID
router.get('/student/:studentId', getGuardianByStudentId);

module.exports = router;
