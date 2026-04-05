const express = require('express');
const router = express.Router();
const { loginAdmin, getMe } = require('../controllers/adminController');
const { createEvent, updateEvent, deleteEvent } = require('../controllers/eventController');
const { getAllRegistrations, exportRegistrations } = require('../controllers/registrationController');
const { getStats } = require('../controllers/statsController');
const protect = require('../middleware/authMiddleware');

// Auth routes
router.post('/login', loginAdmin);
router.get('/me', protect, getMe);

// Stats route
router.get('/stats', protect, getStats);

// Protected event routes
router.post('/events', protect, createEvent);
router.put('/events/:id', protect, updateEvent);
router.delete('/events/:id', protect, deleteEvent);

// Protected registration routes
router.get('/registrations/export', protect, exportRegistrations);
router.get('/registrations', protect, getAllRegistrations);

module.exports = router;