const express = require('express');
const router = express.Router();
const {
  registerForEvent,
  checkRegistration
} = require('../controllers/registrationController');

// Public routes
router.post('/', registerForEvent);
router.get('/check/:email', checkRegistration);

module.exports = router;