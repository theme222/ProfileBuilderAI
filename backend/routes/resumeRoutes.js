// routes/resumeRoutes.js
const express = require('express');
const router = express.Router();
const resumeController = require('../controllers/resumeController');
const aiController = require('../controllers/aiController');

// GET all resumes or create new
router.route('/')
  .get((req, res) => { console.log('Get all resumes'); res.json([]); }) // placeholder
  .post(resumeController.createResume);

// GET, PUT, DELETE resume by ID
router.route('/:id')
  .get(resumeController.getResume)
  .put(resumeController.updateResume)
  .delete(resumeController.deleteResume);

// POST /api/resumes/:id/enhance (AI enhance endpoints)
router.post('/:id/enhance', aiController.enhanceSummary);
router.post('/:id/bullets', aiController.generateBulletPoints);

module.exports = router;
