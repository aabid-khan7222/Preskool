const express = require('express');
const { getAllDesignations, getDesignationById } = require('../controllers/designationController');

const router = express.Router();

// GET /api/designations
router.get('/', getAllDesignations);

// GET /api/designations/:id
router.get('/:id', getDesignationById);

module.exports = router;
