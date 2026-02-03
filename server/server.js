const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

// Import configurations
const serverConfig = require('./src/config/server');
const { testConnection } = require('./src/config/database');

// Import routes
const healthRoutes = require('./src/routes/healthRoutes');
const academicYearRoutes = require('./src/routes/academicYearRoutes');
const classRoutes = require('./src/routes/classRoutes');
const sectionRoutes = require('./src/routes/sectionRoutes');
const subjectRoutes = require('./src/routes/subjectRoutes');
const teacherRoutes = require('./src/routes/teacherRoutes');
const studentRoutes = require('./src/routes/studentRoutes');
const bloodGroupRoutes = require('./src/routes/bloodGroupRoutes');
const religionRoutes = require('./src/routes/religionRoutes');
const castRoutes = require('./src/routes/castRoutes');
const motherTongueRoutes = require('./src/routes/motherTongueRoutes');
const parentRoutes = require('./src/routes/parentRoutes');
const guardianRoutes = require('./src/routes/guardianRoutes');
const houseRoutes = require('./src/routes/houseRoutes');
const addressRoutes = require('./src/routes/addressRoutes');

// Create Express app
const app = express();

// Middleware
app.use(helmet()); // Security headers
app.use(morgan('combined')); // Logging
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes
app.use('/api', healthRoutes);
app.use('/api/academic-years', academicYearRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/sections', sectionRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/blood-groups', bloodGroupRoutes);
app.use('/api/religions', religionRoutes);
app.use('/api/casts', castRoutes);
app.use('/api/mother-tongues', motherTongueRoutes);
app.use('/api/parents', parentRoutes);
app.use('/api/guardians', guardianRoutes);
app.use('/api/houses', houseRoutes);
app.use('/api/addresses', addressRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to PreSkool School Management API',
    version: '1.0.0',
    status: 'running',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.originalUrl,
    method: req.method
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('Global error handler:', error);
  res.status(500).json({
    error: 'Internal server error',
    message: error.message || 'Something went wrong',
    timestamp: new Date().toISOString()
  });
});

// Start server
const startServer = async () => {
  try {
    // Test database connection
    console.log('🔍 Testing database connection...');
    const dbConnected = await testConnection();
    
    if (!dbConnected) {
      console.error('❌ Failed to connect to database. Server will not start.');
      process.exit(1);
    }

    // Start the server
    app.listen(serverConfig.port, () => {
      console.log('🚀 Server is running!');
      console.log(`📍 Server URL: http://localhost:${serverConfig.port}`);
      console.log(`🌍 Environment: ${serverConfig.nodeEnv}`);
      console.log(`📊 Database: Connected to ${process.env.DB_NAME || 'schooldb'}`);
      console.log('📋 Available endpoints:');
      console.log(`   GET  http://localhost:${serverConfig.port}/`);
      console.log(`   GET  http://localhost:${serverConfig.port}/api/health`);
      console.log(`   GET  http://localhost:${serverConfig.port}/api/health/database`);
      console.log(`   GET  http://localhost:${serverConfig.port}/api/academic-years`);
      console.log(`   GET  http://localhost:${serverConfig.port}/api/academic-years/:id`);
      console.log(`   GET  http://localhost:${serverConfig.port}/api/classes`);
      console.log(`   GET  http://localhost:${serverConfig.port}/api/classes/:id`);
      console.log(`   GET  http://localhost:${serverConfig.port}/api/sections`);
      console.log(`   GET  http://localhost:${serverConfig.port}/api/sections/:id`);
      console.log(`   GET  http://localhost:${serverConfig.port}/api/subjects`);
      console.log(`   GET  http://localhost:${serverConfig.port}/api/subjects/:id`);
      console.log(`   GET  http://localhost:${serverConfig.port}/api/subjects/class/:classId`);
      console.log(`   GET  http://localhost:${serverConfig.port}/api/teachers`);
      console.log(`   GET  http://localhost:${serverConfig.port}/api/teachers/:id`);
      console.log(`   GET  http://localhost:${serverConfig.port}/api/teachers/class/:classId`);
      console.log(`   GET  http://localhost:${serverConfig.port}/api/students`);
      console.log(`   GET  http://localhost:${serverConfig.port}/api/students/:id`);
      console.log(`   GET  http://localhost:${serverConfig.port}/api/students/class/:classId`);
      console.log(`   GET  http://localhost:${serverConfig.port}/api/blood-groups`);
      console.log(`   GET  http://localhost:${serverConfig.port}/api/blood-groups/:id`);
      console.log(`   GET  http://localhost:${serverConfig.port}/api/religions`);
      console.log(`   GET  http://localhost:${serverConfig.port}/api/religions/:id`);
      console.log(`   GET  http://localhost:${serverConfig.port}/api/casts`);
      console.log(`   GET  http://localhost:${serverConfig.port}/api/casts/:id`);
      console.log(`   GET  http://localhost:${serverConfig.port}/api/mother-tongues`);
      console.log(`   GET  http://localhost:${serverConfig.port}/api/mother-tongues/:id`);
      console.log(`   GET  http://localhost:${serverConfig.port}/api/houses`);
      console.log(`   GET  http://localhost:${serverConfig.port}/api/houses/:id`);
      console.log(`   GET  http://localhost:${serverConfig.port}/api/addresses`);
      console.log(`   GET  http://localhost:${serverConfig.port}/api/addresses/:id`);
      console.log(`   GET  http://localhost:${serverConfig.port}/api/addresses/user/:userId`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received. Shutting down gracefully...');
  process.exit(0);
});

// Start the server
startServer();
