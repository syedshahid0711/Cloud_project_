const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// @desc    Admin Login
// @route   POST /api/admin/login
// @access  Public
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: '❌ Please provide email and password'
      });
    }

    // Find admin by email
    const admin = await Admin.findOne({ email: email.toLowerCase() });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: '❌ Invalid email or password'
      });
    }

    // Compare password with hashed password in DB
    const isPasswordMatch = await bcrypt.compare(password, admin.password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: '❌ Invalid email or password'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      success: true,
      message: '✅ Login successful',
      token,
      admin: {
        id: admin._id,
        email: admin.email
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

// @desc    Get current logged in admin
// @route   GET /api/admin/me
// @access  Private
const getMe = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select('-password');
    res.status(200).json({
      success: true,
      admin
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '❌ Server error',
      error: error.message
    });
  }
};

module.exports = { loginAdmin, getMe };