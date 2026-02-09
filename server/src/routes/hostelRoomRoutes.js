const express = require('express');
const { getAllHostelRooms, getHostelRoomById } = require('../controllers/hostelRoomController');

const router = express.Router();

// Get all hostel rooms
router.get('/', getAllHostelRooms);

// Get hostel room by ID
router.get('/:id', getHostelRoomById);

module.exports = router;
