// controllers/aiController.js
require('dotenv').config();

const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

/**
 * Enhance resume summary
 */
const enhanceSummary = async (req, res) => {
  const { summary } = req.body;

  if (!summary) {
    return res.status(400).json({ message: 'Summary text is required.' });
  }

  try {
    const prompt = `
      You are a professional resume writing assistant. Take the following personal summary from a resume and make it more impactful, concise, and professional. Focus on highlighting key skills and achievements.
      
      Original Summary: "${summary}"
      
      Revised Summary:`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const improvedSummary = response.text().trim();

    res.status(200).json({ improvedSummary });
  } catch (error) {
    console.error('Error enhancing summary:', error);
    res.status(500).json({ message: 'Failed to enhance summary.' });
  }
};

/**
 * Generate professional bullet points
 */
const generateBullets = async (req, res) => {
  const { jobTitle, company, experienceDescription } = req.body;

  if (!jobTitle || !company || !experienceDescription) {
    return res.status(400).json({
      message: 'Job title, company, and experience description are required.',
    });
  }

  try {
    const prompt = `
      You are an expert resume writer. Given the following job title, company, and description of a user's work experience, generate 3-5 professional and achievement-oriented bullet points that could be used on a resume. Use strong action verbs.
      
      Job Title: ${jobTitle}
      Company: ${company}
      Description: "${experienceDescription}"
      
      Bullet Points:`;

    const result = await model.generateContent(prompt);
    const response = await result.response;

    // Clean up into a list of bullets
    const bullets = response
      .text()
      .trim()
      .split('\n')
      .map(point => point.replace(/^- /, '').trim())
      .filter(point => point.length > 0);

    res.status(200).json({ bullets });
  } catch (error) {
    console.error('Error generating bullets:', error);
    res.status(500).json({ message: 'Failed to generate bullet points.' });
  }
};

module.exports = {
  enhanceSummary,
  generateBullets, // ✅ matches resumeRoutes.js
};