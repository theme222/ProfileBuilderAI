// models/resumeModel.js
const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  title: { type: String, default: 'Untitled Resume' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  personalInfo: { type: Object, default: {} },
  summary: { type: String, default: '' },
  jobTitle: { type: String, default: ''},
  jobDescription: { type: String, default: ''},
  education: { type: [Object], default: [] },
  workExperience: { type: [Object], default: [] },
  projects: { type: [Object], default: [] },
  skills: { type: [Object], default: [] },
  certifications: { type: [Object], default: [] },
}, { timestamps: true });

module.exports = mongoose.model('Resume', resumeSchema);
