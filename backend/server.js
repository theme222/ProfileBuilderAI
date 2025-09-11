// server.js
require('dotenv').config({ path: __dirname + '/../.env' });

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const resumeRoutes = require('./routes/resumeRoutes');

//const testRoutes = require('./routes/testRoutes'); // # test if database work or not (Delete)

const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// Connect to DB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/resumes', resumeRoutes);

//app.use('/api/test', testRoutes); // # test if database work or not (Delete)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
