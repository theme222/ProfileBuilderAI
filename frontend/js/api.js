// api.js
import { authData } from './auth.js';
import { API_BACKEND_URL } from './config.js';
import { currentResume, Resume } from './resume.js';


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
 * @param {Resume} resumeData
 * @returns {Promise<Object>}
 */
export async function saveResume(resumeData) {
  console.log("saveResume called", resumeData);
  if (resumeData._id === null) throw new Error(`Resume doesn't have an id, ${resumeData}`);
  try {
    const res = await fetch(`${API_BACKEND_URL}/api/resumes/${resumeData._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(resumeData.getData())
    });

    if (!res.ok) throw new Error('Failed to save resume');
    resumeData.isSynced = true;

    console.log(await res.json());
  } catch (err) {
    console.error('Save resume error:', err);
  }
}

/**
 * Creates a new resume.
 * @param {Resume} resumeData
 * @returns {Promise<Object>}
 */
export async function createResume(resumeData) {
  console.log("new resume called", resumeData);
  try {
    const res = await fetch(`${API_BACKEND_URL}/api/resumes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(resumeData.getData())
    });

    if (!res.ok) throw new Error('Failed to create resume');
    const resume = await res.json();
    Resume.copyData(new Resume(resume), resumeData);
    resumeData.isSynced = true;
    resumeData._id = resume._id;
    return resumeData;
  } catch (err) {
    console.error('Save resume error:', err);
  }
}

/**
 * Creates a new resume.
 * @param {Resume} resumeData
 * @returns {Promise<Object>}
 */
export async function deleteResume(resumeData) {
  console.log("delete resume called", resumeData);
  if (resumeData._id === null) throw new Error(`Resume doesn't have an id, ${resumeData}`);
  try {
    const res = await fetch(`${API_BACKEND_URL}/api/resumes/${resumeData._id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });

    if (!res.ok) throw new Error('Failed to create resume');
    console.log(await res.json());

  } catch (err) {
    console.error('Save resume error:', err);
  }
}

export async function getAllUserResumes() {
  console.log("getAllUserResumes called");

  try {
    const res = await fetch(`${API_BACKEND_URL}/api/resumes/`);
    if (!res.ok) throw new Error("Could not get all user resumes");
    return await res.json();
  } catch (err) {
    console.error("Get resume error:", err);
  }
}

/**
 * Calls AI to enhance a prompt.
 * @returns {Promise<Object>}
 */
export async function callAiEnhance() {
  console.log('callAiEnhance called');
  try {
    const res = await fetch(`${API_BACKEND_URL}/api/resumes/enhance`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        summary: currentResume.summary,
        jobTitle: currentResume.jobTitle,
        jobDescription: currentResume.jobDescription
      })
    });

    // console.log(res);
    if (!res.ok) throw new Error('AI enhancement failed');
    return await res.json()
  } catch (err) {
    console.error('AI enhance error:', err);
  }
}

/**
 * Calls AI to gen bullets. (Gets ran in callbacks set in ui.js)
 * @returns {Promise<Object>}
 */
export async function callAiBullets(sectionType, sectionData) {
  console.log('callAiEnhance called', sectionType);
  try {
    const res = await fetch(`${API_BACKEND_URL}/api/resumes/bullets`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sectionType: sectionType,
        data: sectionData,
        context: {
          jobTitle: currentResume.jobTitle,
          jobDescription: currentResume.jobDescription,
        }
      })
    });

    console.log(res);
    if (!res.ok) throw new Error('AI enhancement failed');
    return await res.json();
  } catch (err) {
    console.error('AI enhance error:', err);
  }
}
