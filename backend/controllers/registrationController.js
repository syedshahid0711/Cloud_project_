const Registration = require('../models/Registration');
const Event = require('../models/Event');
const generateRegistrationId = require('../utils/generateId');
const sendConfirmationEmail = require('../utils/emailService');

const registerForEvent = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      department,
      yearOfStudy,
      eventId,
      specialRequirements
    } = req.body;

    if (!fullName || !email || !phone || !department || !yearOfStudy || !eventId) {
      return res.status(400).json({
        success: false,
        message: '❌ Please fill all required fields'
      });
    }

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: '❌ Event not found'
      });
    }

    const eventName = event.name || event.title || 'Unknown Event';
    console.log('Event found:', eventName);

    const seatsLeft = event.seatsLeft !== undefined
      ? event.seatsLeft
      : event.capacity - (event.registrations || 0);

    if (seatsLeft <= 0) {
      return res.status(400).json({
        success: false,
        message: '❌ Sorry, this event is fully booked'
      });
    }

    const existingRegistration = await Registration.findOne({
      email: email.toLowerCase(),
      eventId
    });

    if (existingRegistration) {
      return res.status(400).json({
        success: false,
        message: '❌ You have already registered for this event'
      });
    }

    const registrationId = await generateRegistrationId(eventName);
    console.log('Generated ID:', registrationId);

    const registration = await Registration.create({
      registrationId,
      fullName,
      email: email.toLowerCase(),
      phone,
      department,
      yearOfStudy,
      eventId,
      eventName,
      specialRequirements: specialRequirements || ''
    });

    await Event.findByIdAndUpdate(eventId, {
      $inc: {
        registrations: 1,
        seatsLeft: -1
      }
    });

    await sendConfirmationEmail(
      email,
      fullName,
      eventName,
      registrationId,
      event.date,
      event.venue
    );

    res.status(201).json({
      success: true,
      message: '✅ Registration successful!',
      registration: {
        registrationId,
        fullName,
        email,
        eventName,
        eventDate: event.date,
        eventVenue: event.venue
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: '❌ Server error',
      error: error.message
    });
  }
};

const checkRegistration = async (req, res) => {
  try {
    const registrations = await Registration.find({
      email: req.params.email.toLowerCase()
    }).populate('eventId', 'date venue');

    if (registrations.length === 0) {
      return res.status(404).json({
        success: false,
        message: '❌ No registrations found for this email'
      });
    }

    res.status(200).json({
      success: true,
      count: registrations.length,
      registrations
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: '❌ Server error',
      error: error.message
    });
  }
};

const getAllRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find()
      .sort({ registeredAt: -1 });

    res.status(200).json({
      success: true,
      count: registrations.length,
      registrations
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: '❌ Server error',
      error: error.message
    });
  }
};

const exportRegistrations = async (req, res) => {
  try {
    const { eventName } = req.query;
    
    let query = {};
    if (eventName) {
      query.eventName = eventName;
    }

    const registrations = await Registration.find(query).sort({ registeredAt: -1 });

    const { Parser } = require('json2csv');
    const fields = [
      'registrationId',
      'fullName', 
      'email',
      'phone',
      'department',
      'yearOfStudy',
      'eventName',
      'specialRequirements',
      'registeredAt'
    ];

    const parser = new Parser({ fields });
    const csv = parser.parse(registrations);

    const filename = eventName 
      ? `${eventName}-registrations.csv`
      : 'all-registrations.csv';

    res.header('Content-Type', 'text/csv');
    res.attachment(filename);
    res.send(csv);

  } catch (error) {
    res.status(500).json({
      success: false,
      message: '❌ Server error',
      error: error.message
    });
  }
};

module.exports = {
  registerForEvent,
  checkRegistration,
  getAllRegistrations,
  exportRegistrations
};