// api.js
const { setAuthCookie, authData } = require('./auth.js');
const { API_BACKEND_URL } = require('./config.js');

/**
 * Logs in a user.
 * @param {string} username
 * @param {string} password
 * @returns {Promise<Object>}
 */
async function login(username, password) {
  console.log('login called', username);
  try {
    const res = await fetch(`${API_BACKEND_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    if (!res.ok) throw new Error('Login failed');
    return await res.json();
  } catch (err) {
    console.error('Login error:', err);
    return Promise.resolve({});
  }
}

/**
 * Registers a new user.
 * @param {string} username
 * @param {string} email
 * @param {string} password
 * @returns {Promise<Object>}
 */
async function register(username, email, password) {
  console.log('register called', username, email);
  try {
    const res = await fetch(`${API_BACKEND_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    if (!res.ok) throw new Error('Registration failed');

    const data = await res.json(); // Expecting { success: true, cookie: '...' }

    // TODO: Notify user here about success or failure
    if (!data.success) throw new Error('Registration failed');

    setAuthCookie(data.cookie);
    authData.username = username;
    console.log("Registration successful", data);

  } catch (err) {
    console.error('Register error:', err);
    return Promise.resolve({});
  }
}

/**
 * Saves a resume.
 * @param {Object} resumeData
 * @returns {Promise<Object>}
 */
async function saveResume(resumeData) {
  console.log("saveResume called", resumeData);
  try {
    const res = await fetch(`${API_BACKEND_URL}/api/resumes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(resumeData)
    });

    if (!res.ok) throw new Error('Failed to save resume');
    return await res.json();
  } catch (err) {
    console.error('Save resume error:', err);
  }
}

/**
 * Gets a resume by ID.
 * @param {string} id
 * @returns {Promise<Object>}
 */
async function getResumeById(id) {
  console.log('getResumeById called', id);

  try {
    const res = await fetch(`${API_BACKEND_URL}/api/resumes/${id}`);
    if (!res.ok) throw new Error('Resume not found');
    return await res.json();
  } catch (err) {
    console.error('Get resume error:', err);
  }
}

/**
 * Calls AI to enhance a prompt.
 * @param {string} prompt
 * @returns {Promise<Object>}
 */
async function callAiEnhance(prompt) {
  console.log('callAiEnhance called', prompt);
  try {
    const res = await fetch(`${API_BACKEND_URL}/api/ai/enhance-summary`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });

    if (!res.ok) throw new Error('AI enhancement failed');
    return await res.json();
  } catch (err) {
    console.error('AI enhance error:', err);
  }
}
