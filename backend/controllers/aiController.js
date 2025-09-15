// controllers/aiController.js
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
//const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });

// Retry helper with exponential backoff
async function retryRequest(fn, retries = 3, delay = 1000) {
  for (let i = 0; i < retries; i++) {
    try { 
      return await fn();
    } catch (err) {
      if (i === retries - 1) throw err; // rethrow on last attempt
      console.warn(`Retry ${i + 1} failed: ${err.message}. Retrying in ${delay * (i + 1)}ms...`);
      await new Promise(res => setTimeout(res, delay * (i + 1)));
    }
  }
}
/**
 * Enhance a resume's overall summary, optionally tailored to a specific job.
 */ 
const enhanceSummary = async (req, res) => {
  const { summary, jobTitle, jobDescription } = req.body;

  if (!summary) {
    return res.status(400).json({ message: 'Summary text is required.' });
  }

  try {
    let prompt = `You are a professional resume writing assistant. Take the following personal summary and make it more impactful, concise, and professional. Focus on highlighting key skills and achievements.\n`;

    if (jobTitle && jobDescription) {
      prompt += `Tailor the summary to be a strong fit for the following job:\nJob Title: ${jobTitle}\nJob Description: "${jobDescription}"\n`;
    }
 
    // The full instruction is now one block
    prompt += `
      Rewrite the original summary into 2-5 professional sentences. Each sentence must end with a period followed by a newline. Do not add any introductory or concluding remarks.
      
      Original Summary: "${summary}"
      
      Revised Summary:`;

    const result = await retryRequest(() => model.generateContent(prompt));
    const response = await result.response;
    const enhancedText = response.text().trim();

    res.status(200).json({ enhancedText });

  } catch (error) {
    console.error('Error enhancing summary:', error);
    res.status(500).json({ message: 'Failed to enhance summary.' });
  }
};

/**
 * Generates an enhanced description for a specific resume section (work, education, etc.),
 * optionally tailored to a specific job.
 */
const generateBullets = async (req, res) => {
  const {
    sectionType, // The "mode": 'work', 'education', 'projects', etc.
    data,        // The data for the section: { title, area, number, description }
    context      // Optional job context: { jobTitle, jobDescription }
  } = req.body;

  if (!sectionType || !data || !data.description) {
    return res.status(400).json({
      message: 'sectionType and data object with a description are required.',
    });
  }

  let prompt;
  const baseInstruction = `Rewrite the original description into 2-4 professional, achievement-oriented sentences. Each sentence must end with a period followed by a newline. Do not add any introductory or concluding remarks.`;
  const tailoringInstruction = (context && context.jobTitle && context.jobDescription)
    ? `Tailor the rewritten description to be a strong fit for the following job:\nJob Title: ${context.jobTitle}\nJob Description: "${context.jobDescription}"\n`
    : '';

  switch (sectionType) {
    case 'work':
      prompt = `You are an expert resume writer. Given the following work experience, rewrite the description.\nContext:\nJob Title: ${data.title}\nCompany: ${data.area}\nDates: ${data.number}\n\n${tailoringInstruction}${baseInstruction}\n\nOriginal Description: "${data.description}"\n\nEnhanced Description:`;
      break;

    case 'education':
      prompt = `You are an academic and professional writing assistant. Given the following educational background, rewrite the description.\nContext:\nDegree: ${data.title}\nSchool: ${data.area}\nYear(s): ${data.number}\n\n${tailoringInstruction}${baseInstruction}\n\nOriginal Description: "${data.description}"\n\nEnhanced Description:`;
      break;

    case 'projects':
      prompt = `You are a technical project manager and resume expert. Given the following project details, rewrite the description.\nContext:\nProject Title: ${data.title}\nTech Stack: ${data.area}\nYear: ${data.number}\n\n${tailoringInstruction}${baseInstruction}\n\nOriginal Description: "${data.description}"\n\nEnhanced Description:`;
      break;

    case 'skill':
      prompt = `You are a career coach. Given the following skill, rewrite the description to showcase its application or context.\nContext:\nSkill Name: ${data.title}\nCategory: ${data.area}\nProficiency (1-10): ${data.number}\n\n${tailoringInstruction}${baseInstruction}\n\nOriginal Description: "${data.description}"\n\nEnhanced Description:`;
      break;

    case 'certification':
      prompt = `You are a professional development advisor. Given the following certification, rewrite the description to highlight its value.\nContext:\nCertification Name: ${data.title}\nIssuing Organization: ${data.area}\nDate/ID: ${data.number}\n\n${tailoringInstruction}${baseInstruction}\n\nOriginal Description: "${data.description}"\n\nEnhanced Description:`;
      break;
    // Add other cases if needed

    default:
      return res.status(400).json({ message: `Invalid sectionType: ${sectionType}` });
  }

  try {
    const result = await retryRequest(() => model.generateContent(prompt));
    const response = await result.response;
    const enhancedText = response.text().trim();

    // Send back a single string as requested
    res.status(200).json({ enhancedText });

  } catch (error) {
    console.error(`Error generating description for ${sectionType}:`, error);
    res.status(500).json({ message: 'Failed to generate enhanced description.' });
  }
};

module.exports = {
  enhanceSummary,
  generateBullets,
};