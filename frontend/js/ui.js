// ui.js

/**
 * Opens a modal by ID.
 * @param {string} modalId
 */
function openModal(modalId) {
  console.log(`openModal called for ${modalId}`);
  // TODO: Show modal
}

/**
 * Closes a modal by ID.
 * @param {string} modalId
 */
function closeModal(modalId) {
  console.log(`closeModal called for ${modalId}`);
  // TODO: Hide modal
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
function addDynamicEntry(sectionType) {
  console.log(`addDynamicEntry called for ${sectionType}`);
  // TODO: Add entry fields to DOM
}

/**
 * Removes a dynamic entry.
 * @param {HTMLElement} element
 */
function removeDynamicEntry(element) {
  console.log("removeDynamicEntry called", element);
  // TODO: Remove entry from DOM
}

// Example implementation (commented out):
/*
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('hidden');
  }
}
*/
