// main.js
import { enhanceSummary } from './ai.js';
import { getAllUserResumes } from './api.js';
import { authData } from './auth.js';
import { AUTOSAVE_COOLDOWN } from './config.js';
import { renderForm } from './form.js';
import { Resume, addNewResume, changeResumeTitle, copyFromResume, currentResume, deleteCurrentResume, onSaveResume, printResume, resumeList, setCurrentResume, syncCurrentResume } from './resume.js';
import { evaluateSaveQueue, renderSaveButtonAndInfo, saveOptions } from './save.js';
import { openModal, closeModal, addDynamicEntry, renderAuthContent, setupAuthToggle, updateNavbarAuth, renderResumeSelect } from './ui.js';

document.addEventListener('DOMContentLoaded', async () => {
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

  document.getElementById("ai-summary-btn").addEventListener('click', () => {
    enhanceSummary();
  })

  document.getElementById("autosave-btn").addEventListener('click', () => {
    if (!authData.isAuthenticated) {
      alert("Login To Autosave");
      return;
    }
    saveOptions.autosave = !saveOptions.autosave;
    renderSaveButtonAndInfo();
  })

  document.getElementById("print-btn").addEventListener('click', () => {
    printResume();
  })


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
    syncCurrentResume();
    setCurrentResume(resumeList[parseInt(e.target.value)]);
    console.log(`Changing to ${currentResume}`);
    renderForm();
  });

  document.getElementById("new-resume-btn").addEventListener('click', () => {
    syncCurrentResume();
    addNewResume();
  })

  document.getElementById("confirm-title-btn").addEventListener('click', () => {
    changeResumeTitle(document.getElementById("title-input").value);
    syncCurrentResume();
  })

  document.getElementById("confirm-copy-btn").addEventListener('click', () => {
    copyFromResume(document.getElementById('copy-source-selector').value);
    syncCurrentResume();
  })

  document.getElementById("delete-resume-btn").addEventListener('click', () => {
    deleteCurrentResume();
  })

  setupAuthToggle();
  await renderAuthContent();

  if (authData.isAuthenticated) { // Load user saved resumes
    const loadedResumes = await getAllUserResumes();
    console.log(loadedResumes);
    if (loadedResumes && Array.isArray(loadedResumes)) {
      loadedResumes.forEach((element) => {
        const resumeObj = new Resume(element);
        resumeObj.isSynced = true;
        resumeList.push(resumeObj); // Ensure it is of type Resume.
      });
    }
    console.log(resumeList);
    saveOptions.autosave = true;
    if (resumeList.length > 0) 
      setCurrentResume(resumeList[0]);
  }
  else {
    // Create a new resume (But obviously don't need to sync yet)
    addNewResume();
  }

  renderResumeSelect();
  renderForm();
  renderSaveButtonAndInfo();

  setInterval(evaluateSaveQueue, AUTOSAVE_COOLDOWN * 1000);
  // openModal('preview-modal');
});
// UI and API functions are imported globally for this skeleton
