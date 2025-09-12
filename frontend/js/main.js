// main.js
import { authData } from './auth.js';
import { openModal, closeModal, addDynamicEntry, removeDynamicEntry, renderAuthContent, setupAuthToggle, updateNavbarAuth } from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
  console.log('App initialized');

  document.getElementById('preview-btn').addEventListener('click', function() {
    openModal('preview-modal');
  });
  document.getElementById('auth-btn').addEventListener('click', function() {
    openModal('auth-modal');
  });
  document.getElementById('close-preview').addEventListener('click', function() {
    closeModal('preview-modal');
  });
  document.getElementById('close-auth').addEventListener('click', function() {
    closeModal('auth-modal');
  });

  document.getElementById('login-radio').addEventListener('click', function() {
      if (authData.isAuthenticated) return;
      document.getElementById('form-username-row').classList.add('hidden');
      document.getElementById('auth-form-submit').textContent = 'Login';
    }
  );

  document.getElementById('signup-radio').addEventListener('click', function() {
      if (authData.isAuthenticated) return;
      document.getElementById('form-username-row').classList.remove('hidden');
      document.getElementById('auth-form-submit').textContent = 'Register';
    }
  );

  // THIS NEEDS TO BE DONE CASE BY CASE
  // document.getElementById('ai-summary-btn').addEventListener('click', () => { 
  //   // Delegate to API
  //   // callAiEnhance(...)
  //   console.log('Enhance summary with AI');
  // });

  // Add listeners for dynamic add buttons
  document.getElementById('add-education-btn').addEventListener('click', () => {
    addDynamicEntry('education');
  });
  document.getElementById('add-work-btn').addEventListener('click', () => {
    addDynamicEntry('work');
  });
  document.getElementById('add-project-btn').addEventListener('click', () => {
    addDynamicEntry('project');
  });
  document.getElementById('add-skill-btn').addEventListener('click', () => {
    addDynamicEntry('skill');
  });
  document.getElementById('add-certification-btn').addEventListener('click', () => {
    addDynamicEntry('certification');
  });
  // Close modals
  document.getElementById('close-preview').addEventListener('click', () => closeModal('preview-modal'));
  document.getElementById('close-auth').addEventListener('click', () => closeModal('auth-modal'));
  // Form submit
  document.getElementById('resume-form').addEventListener('submit', (e) => {
    e.preventDefault();
    // Collect form data and call saveResume
    console.log('Save resume');
  });
});
// UI and API functions are imported globally for this skeleton

// On page load, update navbar and modal
window.addEventListener('DOMContentLoaded', async () => {
  setupAuthToggle();
  await renderAuthContent();
});