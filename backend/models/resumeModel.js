// models/resumeModel.js
const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  personalInfo: { type: Object, default: {} },
  summary: { type: String, default: '' },
  education: { type: [Object], default: [] },
  workExperience: { type: [Object], default: [] },
  projects: { type: [Object], default: [] },
  skills: { type: [Object], default: [] },
  certifications: { type: [Object], default: [] },
}, { timestamps: true });

module.exports = mongoose.model('Resume', resumeSchema);
