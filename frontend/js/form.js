import { currentResume, Resume } from "./resume.js";
import { addDynamicEntry } from "./ui.js";

function getSectionContent(entry, sectionName) {
  // Returns undefined if everything is null
  const content = {
    title: entry.querySelector(`input[name="${sectionName}-title"]`).value,
    area: entry.querySelector(`input[name="${sectionName}-area"]`).value,
    number: entry.querySelector(`input[name="${sectionName}-number"]`).value,
    description: entry.querySelector(
      `textarea[name="${sectionName}-description"]`
    ).value,
  };

  if ( !content.title && !content.area && !content.number && !content.description)
    return undefined;
  else return content;
}

export function getCurrentFormData() {
  const formData = new FormData(document.getElementById("resume-form"));
  const resumeData = new Resume({
    personalInfo: {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      linkedin: formData.get("linkedin"),
      github: formData.get("github"),
      address: formData.get("address"),
    },
    jobTitle: formData.get("jobTitle"),
    jobDescription: formData.get("jobDescription"),
    summary: formData.get("summary"),
  });

  // Collect education entries
  document
    .querySelectorAll("#education-entries .dynamic-entry")
    .forEach((entry) => {
      const content = getSectionContent(entry, "education");
      if (content) resumeData.education.push(content);
    });

  // Collect work entries
  document.querySelectorAll("#work-entries .dynamic-entry").forEach((entry) => {
    const content = getSectionContent(entry, "work");
    if (content) resumeData.work.push(content);
  });

  // Collect project entries
  document
    .querySelectorAll("#project-entries .dynamic-entry")
    .forEach((entry) => {
      const content = getSectionContent(entry, "project");
      if (content) resumeData.projects.push(content);
    });

  // Collect skill entries
  document
    .querySelectorAll("#skill-entries .dynamic-entry")
    .forEach((entry) => {
      const content = getSectionContent(entry, "skill");
      if (content) resumeData.skills.push(content);
    });

  // Collect certification entries
  document
    .querySelectorAll("#certification-entries .dynamic-entry")
    .forEach((entry) => {
      const content = getSectionContent(entry, "certification");
      if (content) resumeData.certifications.push(content);
    });

  // console.log(resumeData);
  return resumeData;
}

export function setCurrentFormData(resumeData) {
  // console.log(resumeData);
  // Set static personal info fields
  const pi = resumeData.personalInfo || {};
  document.querySelector('input[name="name"]').value = pi.name || "";
  document.querySelector('input[name="email"]').value = pi.email || "";
  document.querySelector('input[name="phone"]').value = pi.phone || "";
  document.querySelector('input[name="linkedin"]').value = pi.linkedin || "";
  document.querySelector('input[name="github"]').value = pi.github || "";
  document.querySelector('input[name="address"]').value = pi.address || "";

  // Set job title/description/summary
  document.querySelector('input[name="jobTitle"]').value = resumeData.jobTitle || "";
  document.querySelector('textarea[name="jobDescription"]').value = resumeData.jobDescription || "";
  document.querySelector('textarea[name="summary"]').value = resumeData.summary || "";

  // Helper to clear and repopulate dynamic entries
  function setDynamicSection(section, dataArr) {
    const container = document.getElementById(`${section}-entries`);
    // Remove all existing dynamic entries
    while (container && container.firstChild)
      container.removeChild(container.firstChild);
    (dataArr || []).forEach((item) => { addDynamicEntry(section, item); });
  }

  setDynamicSection("education", resumeData.education);
  setDynamicSection("work", resumeData.work);
  setDynamicSection("project", resumeData.projects);
  setDynamicSection("skill", resumeData.skills);
  setDynamicSection("certification", resumeData.certifications);
}

export function renderForm() {
  const formElement = document.getElementById("resume-form");

  if (!currentResume) formElement.classList.add("hidden");
  else formElement.classList.remove("hidden");

  if (currentResume) setCurrentFormData(currentResume);
}
