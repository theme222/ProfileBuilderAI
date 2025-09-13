// controllers/resumeController.js
const Resume = require('../models/resumeModel.js');

exports.createResume = async (req, res) => {
  try {
    const newResumeData = {
      user: req.user._id,
      ...req.body
    };

    const resume = await Resume.create(newResumeData);
    res.status(201).json(resume);

  } catch (error) {
    res.status(400).json({ message: 'Error creating resume', error: error.message });
  }

};

exports.getAllUserResumes = async (req, res) => {
  try {
    // Find all resumes where the user field matches the logged-in user's ID
    const resumes = await Resume.find({ user: req.user._id });
    res.json(resumes);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    res.json(resume);

  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.updateResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    if (resume.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const updatedResume = await Resume.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json(updatedResume);

  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    if (resume.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await Resume.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Resume deleted successfully' });

  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
