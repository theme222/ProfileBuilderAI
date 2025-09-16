// routes/resumeRoutes.js
const express = require('express');
const router = express.Router();
const resumeController = require('../controllers/resumeController');
const aiController = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware.js'); 

// GET all resumes or create new
router.route('/')
  .get(protect, resumeController.getAllUserResumes) 
  .post(protect, resumeController.createResume);    

// GET, PUT, DELETE resume by ID
router.route('/:id')
  .get(protect, resumeController.getResume)      
  .put(protect, resumeController.updateResume)     
  .delete(protect, resumeController.deleteResume); 

// POST /api/resumes/enhance (AI enhance endpoints)
router.post('/enhance', aiController.enhanceSummary); 
router.post('/bullets', aiController.generateBullets); 

module.exports = router;