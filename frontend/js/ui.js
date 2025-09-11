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
    // ✅ Call backend to load resume and then render
  const previewContainer = document.getElementById("resume-preview");
  if (!previewContainer) return;

  fetch(`/api/resumes/${resumeData.id}`, { credentials: "include" })
    .then(res => res.json())
    .then(data => {
      previewContainer.innerHTML = `
        <h2>${data.name || "Your Name"}</h2>
        <p><strong>Email:</strong> ${data.email || ""}</p>
        <p><strong>Summary:</strong> ${data.summary || ""}</p>
        <h3>Experience</h3>
        <ul>
          ${(data.experience || [])
            .map(
              (exp) => `
              <li>
                <strong>${exp.role || ""}</strong> at ${exp.company || ""} 
                (${exp.start || ""} - ${exp.end || ""})
                <p>${exp.description || ""}</p>
              </li>
            `
            )
            .join("")}
        </ul>
      `;
    })
    .catch(err => console.error("Failed to render preview", err));
}

/**
 * Adds a dynamic entry (education, work, etc.)
 * @param {string} sectionType
 */
export function addDynamicEntry(sectionType) {
  console.log(`addDynamicEntry called for ${sectionType}`);
  // TODO: Add entry fields to DOM
  // ✅ Still adds to DOM, but also persists to backend with PUT /api/resumes/:id
  const container = document.getElementById(`${sectionType}-container`);
  if (!container) return;

  const entry = document.createElement("div");
  entry.className = "dynamic-entry";
  entry.innerHTML = `
    <input type="text" name="${sectionType}-title" placeholder="Title/Role" required>
    <input type="text" name="${sectionType}-subtitle" placeholder="Company/School" required>
    <input type="text" name="${sectionType}-date" placeholder="Date range">
    <textarea name="${sectionType}-description" placeholder="Description"></textarea>
    <button type="button" class="btn btn-danger remove-btn">Remove</button>
  `;

  entry.querySelector(".remove-btn").addEventListener("click", () => {
    removeDynamicEntry(entry);
  });
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

  fetch(`/api/resumes/123`, { // replace 123 with actual resumeId
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ /* updated section array without this entry */ }),
    credentials: "include",
  }).catch(err => console.error("Failed to remove entry", err));
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
