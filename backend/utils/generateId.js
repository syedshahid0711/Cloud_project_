const Registration = require('../models/Registration');

const generateRegistrationId = async (eventName) => {
  try {
    // Safety check
    if (!eventName) {
      eventName = 'EVENT';
    }

    // Take first word of event name and make it uppercase
    const prefix = eventName.toString().split(' ')[0].toUpperCase();

    // Get current year
    const year = new Date().getFullYear();

    // Count total registrations to make unique number
    const count = await Registration.countDocuments();

    // Pad number with zeros e.g. 00001, 00002
    const number = String(count + 1).padStart(5, '0');

    // Final ID e.g. TECH-2025-00001
    return `${prefix}-${year}-${number}`;

  } catch (error) {
    // Fallback ID if anything goes wrong
    return `REG-${Date.now()}`;
  }
};

module.exports = generateRegistrationId;