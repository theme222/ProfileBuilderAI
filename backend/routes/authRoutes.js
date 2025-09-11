// routes/authRoutes.js
const express = require('express');
const { protect } = require('../middleware/authMiddleware.js');
const router = express.Router();
const authController = require('../controllers/authController');

// POST /api/auth/register
router.post('/register', authController.registerUser);

// POST /api/auth/login
router.post('/login', authController.loginUser);

// GET /api/auth/profile
router.get('/profile', protect, authController.getUserProfile);

module.exports = router;
