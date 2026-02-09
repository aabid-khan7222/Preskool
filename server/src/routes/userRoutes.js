const express = require('express');
const { getAllUsers, getUserById } = require('../controllers/userController');

const router = express.Router();

// GET /api/users
router.get('/', getAllUsers);

// GET /api/users/:id
router.get('/:id', getUserById);

module.exports = router;
