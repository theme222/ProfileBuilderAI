// api.js
import { authData } from './auth.js';
import { API_BACKEND_URL } from './config.js';


export async function getUserProfile()
{
  try {
    const res = await fetch(`${API_BACKEND_URL}/api/auth/profile`, {
      credentials: 'include',
    });
    return res.ok ? await res.json() : null;
  } catch (e) { console.error("could not get user profile", e); }
}

/**
 * Logs in a user.
 * @param {string} username
 * @param {string} password
 * @returns {Promise<Object>}
 */
export async function login(email, password) {
  console.log('login called', email);
  try {
    const res = await fetch(`${API_BACKEND_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password })
    });

    if (!res.ok) throw new Error('Login failed');

    const data = await res.json();
    // console.log("Login successful", data);
    return data;

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
export async function register(username, email, password) {
  console.log('register called', username, email);
  try {
    const res = await fetch(`${API_BACKEND_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ username, email, password })
    });

    if (!res.ok) throw new Error('Registration failed');
    const data = await res.json(); // Expecting { success: true, cookie: '...' }

    authData.username = data.username;
    // console.log("Registration successful", data);
    return data;

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
      credentials: 'include',
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
