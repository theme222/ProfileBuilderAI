// main.js
import { loadResumePreview } from './resume.js';
import { openModal, closeModal, addDynamicEntry, renderAuthContent, setupAuthToggle, updateNavbarAuth } from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
  console.log('App initialized');

  // Open Modals
  document.getElementById('preview-btn').addEventListener('click', function() {
    openModal('preview-modal');
  });
  document.getElementById('auth-btn').addEventListener('click', function() {
    openModal('auth-modal');
  });
  document.getElementById('copy-resume-btn').addEventListener('click', async () => {
    openModal('copy-modal');
  });

  // Close Modals
  document.getElementById('close-preview').addEventListener('click', function() {
    closeModal('preview-modal');
  });
  document.getElementById('close-auth').addEventListener('click', function() {
    closeModal('auth-modal');
  });
  document.getElementById('close-copy').addEventListener('click', async () => {
    closeModal('copy-modal');
  });


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

  // Form submit
  document.getElementById('resume-form').addEventListener('submit', (e) => {
    e.preventDefault();
    // Collect form data and call saveResume
    console.log('Save resume');
  });


  setupAuthToggle();
  renderAuthContent();
  loadResumePreview();
});
// UI and API functions are imported globally for this skeleton
