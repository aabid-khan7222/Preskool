const express = require('express');
const { getAllClassSchedules, getClassScheduleById, getClassSchedulesDebug } = require('../controllers/classScheduleController');

const router = express.Router();

router.get('/', getAllClassSchedules);
router.get('/debug', getClassSchedulesDebug);
router.get('/:id', getClassScheduleById);

module.exports = router;
