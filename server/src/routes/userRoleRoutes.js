const express = require('express');
const { getAllUserRoles, getUserRoleById } = require('../controllers/userRoleController');

const router = express.Router();

// GET /api/user-roles
router.get('/', getAllUserRoles);

// GET /api/user-roles/:id
router.get('/:id', getUserRoleById);

module.exports = router;
