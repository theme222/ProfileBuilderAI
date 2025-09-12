// middleware/authMiddleware.js
const User = require('../models/userModel');

const protect = async (req, res, next) => {
  let token;

  // Manually parse token from cookie
  if (req.headers.cookie && req.headers.cookie.startsWith('token=')) {
    token = req.headers.cookie.split('=')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  // Find user by the token
  const user = await User.findOne({ token }).select('-password');

  if (!user) {
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }

  // Attach user to the request
  req.user = user;
  next();
};

module.exports = { protect };