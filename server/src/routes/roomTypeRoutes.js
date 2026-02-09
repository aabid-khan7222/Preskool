const express = require('express');
const { getAllRoomTypes, getRoomTypeById } = require('../controllers/roomTypeController');

const router = express.Router();

// Get all room types
router.get('/', getAllRoomTypes);

// Get room type by ID
router.get('/:id', getRoomTypeById);

module.exports = router;
