const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  try {
    // Check if token exists in request header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        success: false,
        message: '❌ Not authorized, no token provided' 
      });
    }

    // Extract token from "Bearer <token>"
    const token = authHeader.split(' ')[1];

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach admin info to request
    req.admin = decoded;

    // Move to next function
    next();

  } catch (error) {
    return res.status(401).json({ 
      success: false,
      message: '❌ Not authorized, token is invalid or expired' 
    });
  }
};

module.exports = protect;