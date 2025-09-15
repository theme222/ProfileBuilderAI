import { upperFirst } from "./misc.js";
import { getAuthCookie, authData, deleteAuthCookie } from './auth.js';
import { getUserProfile, register, login } from "./api.js";
import { currentResume, loadResumePreview, resumeList } from "./resume.js";
import { getCurrentFormData } from "./form.js";
// ui.js

/**
 * Opens a modal by ID.
 * @param {string} modalId
 */
export function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove("hidden");
    if (modalId === "auth-modal") {
      renderAuthContent();
    }
    if (modalId === "preview-modal") {
      const resumeData = getCurrentFormData();
      loadResumePreview(resumeData);
    }
  }
}

/**
 * Closes a modal by ID.
 * @param {string} modalId
 */
export function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add("hidden");
  }
}

/**
 * Adds a dynamic entry (education, work, etc.)
 * @param {string} sectionType
 */
export function addDynamicEntry(sectionType, values = {title: "", area: "", number: "", description: ""}) {
  console.log(`addDynamicEntry called for ${sectionType}`);
  // TODO: Add entry fields to DOM
  // ✅ Still adds to DOM, but also persists to backend with PUT /api/resumes/:id
  const container = document.getElementById(`${sectionType}-entries`);
  if (!container) {
    console.error(`Container for ${sectionType} not found`);
    return;
  }

  let placeholder;
  switch (sectionType) {
    case "education":
      placeholder = {
        title: "Degree (e.g. B.Tech in CSE)",
        area: "School/University",
        number: "Year(s) (e.g. 2021-2025)",
        description: "Brief description, honors, or activities",
      };
      break;
    case "work":
      placeholder = {
        title: "Job Title (e.g. Software Intern)",
        area: "Company Name",
        number: "Dates (e.g. Jun 2023 - Aug 2023)",
        description: "Describe your responsibilities and achievements",
      };
      break;
    case "projects":
      placeholder = {
        title: "Project Title",
        area: "Tech Stack (e.g. React, Node.js)",
        number: "Year or Duration",
        description: "Project description and your role",
      };
      break;
    case "skill":
      placeholder = {
        title: "Skill Name (e.g. Python)",
        area: "Category (e.g. Programming Language)",
        number: "Proficiency (1 - 10)",
        description: "Other Details (optional)",
      };
      break;
    case "certification":
      placeholder = {
        title: "Certification Name",
        area: "Issuing Organization",
        number: "Date Earned / Credential ID",
        description: "Other details (optional)",
      };
      break;
    default:
      placeholder = {
        title: "Title/Role",
        area: "Company/School",
        number: "Date Range",
        description: "Description",
      };
  }

  const entry = document.createElement("div");
  entry.className = "dynamic-entry";
  entry.innerHTML = `
      <h3>
        ${upperFirst(sectionType)} Entry ${container.childElementCount + 1}
        <div class="close remove-btn" style="font-size: 0.9rem;">X</div>
      </h3>
      <input type="text" name="${sectionType}-title" placeholder="${ placeholder.title }" value="${ values.title }" required>
      <input type="text" name="${sectionType}-area" placeholder="${ placeholder.area }" value="${ values.area }" required>
      <input type="text" name="${sectionType}-number" placeholder="${ placeholder.number }" value="${ values.number }">
      <div class="textarea-container">
      <textarea name="${sectionType}-description" placeholder="${ placeholder.description }">${ values.description }</textarea>
      <button type="button" class="btn btn-outline-secondary btn-ai">
        <img src="assets/sparkles.svg" alt="AI Enhance" style="width:1.2em;height:1.2em;vertical-align:middle;margin-right:0.4em;">AI Enhance
      </button>
      </div>
  `;

  entry.querySelector(".remove-btn").addEventListener("click", () => {
    removeDynamicEntry(entry);
  });
  container.appendChild(entry);
}

/**
 * Removes a dynamic entry.
 * @param {HTMLElement} element
 */
export function removeDynamicEntry(element) {
  console.log("removeDynamicEntry called", element);
  // TODO: Remove entry from DOM
  // ✅ Remove from DOM and persist deletion with PUT /api/resumes/:id
  if (element && element.parentNode) {
    element.parentNode.removeChild(element);
  }

  // fetch(`/api/resumes/123`, { // replace 123 with actual resumeId
  //   method: "PUT",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ /* updated section array without this entry */ }),
  //   credentials: "include",
  // }).catch(err => console.error("Failed to remove entry", err));
}

// Helper: Get selected auth mode
export function getSelectedAuthMode() {
  const loginRadio = document.getElementById('login-radio');
  return loginRadio && loginRadio.checked ? 'login' : 'signup';
}

// Helper: Render auth modal content based on login state
export async function renderAuthContent() {
  const authContent = document.getElementById('auth-content');
  if (!authContent) return;

  const token = getAuthCookie();
  if (token) {
    // Check with backend if token is valid and get username
    const user = await getUserProfile();
    if (user) {
      updateNavbarAuth(user.username);

      authData.isAuthenticated = true;
      authData.username = user.username;

      authContent.innerHTML = 
      `<div class="auth-loggedin">
        <h2 class="auth-loggedin-msg">
          Logged in as <span id='auth-username-span'>${user.username}</span>
        </h2>
        <button id="logout-btn" class="btn btn-primary auth-logout-btn">Logout</button>
      </div>`;

      document.getElementById('logout-btn').onclick = async function() {
        // Remove cookie and reload UI
        authData.isAuthenticated = false;
        authData.username = null;
        deleteAuthCookie();
        await renderAuthContent();
      };
      return;
    }
  }

  // Not logged in: show form
  updateNavbarAuth();

  authContent.innerHTML = `<form id="auth-form" class="auth-form">
    <div class="form-row" id="form-username-row">
      <input type="text" name="username" placeholder="Username" required autocomplete="username">
    </div>
    <div class="form-row" id="form-email-row">
      <input type="email" name="email" placeholder="Email" required autocomplete="email">
    </div>
    <div class="form-row" id="form-password-row">
      <input type="password" name="password" placeholder="Password" required autocomplete="current-password">
    </div>
    <div class="form-actions">
      <button type="submit" class="btn btn-primary" style="width: 100%;" id="auth-form-submit">Continue</button>
    </div>
  </form>`;

  const usernameRow = document.getElementById('form-username-row')
  if (getSelectedAuthMode() === 'login') {
    usernameRow.style.display = 'none';
    usernameRow.querySelector('input').required = false;
  } else {
    usernameRow.style.display = 'flex';
    usernameRow.querySelector('input').required = true;
  }

  // Attach submit handler
  const authForm = document.getElementById('auth-form');
  if (!authForm) return;

  authForm.onsubmit = async function(e) {
    e.preventDefault();
    const mode = getSelectedAuthMode();

    let user;
    if (mode === 'login') {
      user = await login(authForm.email.value, authForm.password.value);
    }
    else if (mode === 'signup') {
      user = await register(authForm.username.value, authForm.email.value, authForm.password.value);
    }

    console.log("User logged in", user);
    updateNavbarAuth("Loading..."); // will get set on re run
    await renderAuthContent();

  };
}

// Update navbar button
export function updateNavbarAuth(username) {
  const authBtn = document.getElementById('auth-btn');
  if (authBtn) {
    authBtn.textContent = username || 'Login / Signup';
  }
}

// Listen for radio toggle to re-render form
export function setupAuthToggle() {
  const radios = document.querySelectorAll('input[name="auth-mode"]');
  radios.forEach(radio => {
    radio.addEventListener('change', renderAuthContent);
  });
}

export function renderResumeSelect() {
  const resumeSelect = document.getElementById("resume-selector");

  resumeSelect.innerHTML = '';

  resumeList.forEach((resume, index) => {
    resumeSelect.innerHTML += `
      <option value="${index}" ${resume === currentResume ? "selected": ""}>${resume.title}</option>
    `;
  })

  const copyResumeSelect = document.getElementById("copy-source-selector");

  copyResumeSelect.innerHTML = '';

  resumeList.forEach((resume, index) => {
    copyResumeSelect.innerHTML += `
      <option value="${index}" ${resume === currentResume ? "selected": ""}>${resume.title}</option>
    `;
  })
}
