// main.js
import { authData } from './auth.js';
import { renderForm } from './form.js';
import { Resume, addNewResume, changeResumeTitle, copyFromResume, currentResume, onSaveResume, resumeList, setCurrentResume } from './resume.js';
import { openModal, closeModal, addDynamicEntry, renderAuthContent, setupAuthToggle, updateNavbarAuth, renderResumeSelect } from './ui.js';

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
  document.getElementById('edit-title-btn').addEventListener('click', async () => {
    openModal('title-modal');
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
  document.getElementById('close-title').addEventListener('click', async () => {
    closeModal('title-modal');
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
    onSaveResume();
  });

  document.getElementById("resume-selector").addEventListener('change', (e) => {
    currentResume = resumeList[parseInt(e.target.value)];
    console.log(`Changing to ${currentResume}`);
    renderForm();
  });

  document.getElementById("new-resume-btn").addEventListener('click', () => {
    addNewResume();
  })

  document.getElementById("confirm-title-btn").addEventListener('click', () => {
    changeResumeTitle(document.getElementById("title-input").value);
  })

  document.getElementById("confirm-copy-btn").addEventListener('click', () => {
    copyFromResume(document.getElementById('copy-source-selector').value);
  })


  setupAuthToggle();
  renderAuthContent();

  if (authData.isAuthenticated) {
    // Load the first resume
  }
  else {
    // Create a new resume (But obviously don't need to sync yet)
    addNewResume();
  }

  renderResumeSelect();
  renderForm();
});
// UI and API functions are imported globally for this skeleton
