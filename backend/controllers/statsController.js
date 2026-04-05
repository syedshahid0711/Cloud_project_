const Event = require('../models/Event');
const Registration = require('../models/Registration');

// @desc    Get admin dashboard stats
// @route   GET /api/admin/stats
// @access  Private
const getStats = async (req, res) => {
  try {
    // Total events count
    const totalEvents = await Event.countDocuments();

    // Total registrations count
    const totalRegistrations = await Registration.countDocuments();

    // Today's registrations
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayRegistrations = await Registration.countDocuments({
      registeredAt: { $gte: today }
    });

    // Most popular event
    const popularEvent = await Registration.aggregate([
      {
        $group: {
          _id: '$eventName',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 1 }
    ]);

    const mostPopularEvent = popularEvent.length > 0
      ? popularEvent[0]._id
      : 'No registrations yet';

    // Last 5 recent registrations
    const recentRegistrations = await Registration.find()
      .sort({ registeredAt: -1 })
      .limit(5)
      .select('fullName email eventName registrationId registeredAt');

    res.status(200).json({
      success: true,
      stats: {
        totalEvents,
        totalRegistrations,
        todayRegistrations,
        mostPopularEvent,
        recentRegistrations
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: '❌ Server error',
      error: error.message
    });
  }
};

module.exports = { getStats };