// models/userModel.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  token: { type: String }, // This is the new field for the session token
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);