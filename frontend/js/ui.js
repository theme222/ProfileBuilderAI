// ui.js

/**
 * Opens a modal by ID.
 * @param {string} modalId
 */
export function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('hidden');
    if (modalId === 'auth-modal') {
      renderAuthForm();
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
    modal.classList.add('hidden');
  }
}

/**
 * Renders the resume preview in the modal.
 * @param {Object} resumeData
 */
function renderPreview(resumeData) {
  console.log("renderPreview called", resumeData);
  // TODO: Render resume preview
}

/**
 * Adds a dynamic entry (education, work, etc.)
 * @param {string} sectionType
 */
export function addDynamicEntry(sectionType) {
  console.log(`addDynamicEntry called for ${sectionType}`);
  // TODO: Add entry fields to DOM
}

/**
 * Removes a dynamic entry.
 * @param {HTMLElement} element
 */
export function removeDynamicEntry(element) {
  console.log("removeDynamicEntry called", element);
  // TODO: Remove entry from DOM
}


function renderAuthForm() {
  const authContent = document.getElementById('auth-content');
  if (!authContent) return;
  authContent.innerHTML = `
    <form id="auth-form" class="auth-form">
      <div class="form-row">
        <input type="text" name="username" placeholder="Username" required autocomplete="username">
      </div>
      <div class="form-row">
        <input type="email" name="email" placeholder="Email" required autocomplete="email">
      </div>
      <div class="form-row">
        <input type="password" name="password" placeholder="Password" required autocomplete="current-password">
      </div>
      <div class="form-actions">
        <button type="submit" class="btn btn-primary" style="width: 100%;">Continue</button>
      </div>
    </form>
  `;
}
