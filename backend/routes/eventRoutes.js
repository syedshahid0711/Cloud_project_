const express = require('express');
const router = express.Router();
const {
  getAllEvents,
  getEventById,
} = require('../controllers/eventController');

// Public routes - no token needed
router.get('/', getAllEvents);
router.get('/:id', getEventById);

module.exports = router;