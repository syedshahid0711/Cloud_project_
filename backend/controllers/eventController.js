const Event = require('../models/Event');

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.status(200).json({
      success: true,
      count: events.length,
      events
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '❌ Server error',
      error: error.message
    });
  }
};

const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: '❌ Event not found'
      });
    }
    res.status(200).json({
      success: true,
      event
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '❌ Server error',
      error: error.message
    });
  }
};

const createEvent = async (req, res) => {
  try {
    const { name, description, date, venue, category, capacity } = req.body;

    if (!name || !description || !date || !venue || !capacity) {
      return res.status(400).json({
        success: false,
        message: '❌ Please fill all required fields'
      });
    }

    const event = await Event.create({
      name,
      description,
      date,
      venue,
      category: category || 'Other',
      capacity: Number(capacity),
      seatsLeft: Number(capacity)
    });

    res.status(201).json({
      success: true,
      message: '✅ Event created successfully',
      event
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '❌ Server error',
      error: error.message
    });
  }
};

const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: '❌ Event not found'
      });
    }

    if (req.body.capacity) {
      const diff = Number(req.body.capacity) - event.capacity;
      req.body.seatsLeft = event.seatsLeft + diff;
      req.body.capacity = Number(req.body.capacity);
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: '✅ Event updated successfully',
      event: updatedEvent
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '❌ Server error',
      error: error.message
    });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: '❌ Event not found'
      });
    }

    await Event.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: '✅ Event deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '❌ Server error',
      error: error.message
    });
  }
};

module.exports = {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent
};