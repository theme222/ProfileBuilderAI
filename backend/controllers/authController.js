// controllers/authController.js
const User = require('../models/userModel');
const crypto = require('crypto');

// --- User Registration ---
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    const user = await User.create({
      username,
      email,
      password,
    });

    const token = crypto.randomBytes(32).toString('hex');
    user.token = token;
    await user.save();

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

// --- User Login ---
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }
    
    const user = await User.findOne({ email });

    // Important: Check for user existence before comparing password
    if (!user || password !== user.password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const token = crypto.randomBytes(32).toString('hex');
    user.token = token;
    await user.save();

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

// --- Get User Profile ---
exports.getUserProfile = async (req, res) => {
  res.status(200).json(req.user);
};