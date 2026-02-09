const express = require('express');
const { getAllRoutes, getRouteById } = require('../controllers/transportRouteController');
const { getAllPickupPoints, getPickupPointById } = require('../controllers/transportPickupController');
const { getAllVehicles, getVehicleById } = require('../controllers/transportVehicleController');
const { getAllDrivers, getDriverById } = require('../controllers/transportDriverController');

const router = express.Router();

// Transport routes (route names)
router.get('/routes', getAllRoutes);
router.get('/routes/:id', getRouteById);

// Pickup points
router.get('/pickup-points', getAllPickupPoints);
router.get('/pickup-points/:id', getPickupPointById);

// Vehicles (driver_id = assignment to driver)
router.get('/vehicles', getAllVehicles);
router.get('/vehicles/:id', getVehicleById);

// Drivers
router.get('/drivers', getAllDrivers);
router.get('/drivers/:id', getDriverById);

module.exports = router;
