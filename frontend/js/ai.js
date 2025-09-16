import { callAiBullets, callAiEnhance } from "./api.js";
import { currentResume, syncCurrentResume } from "./resume.js";

export const aiData = {
    isPrompting: false
};

export async function enhanceSummary() {
    if (aiData.isPrompting) return;

    syncCurrentResume();
    if (!currentResume.jobTitle || !currentResume.jobDescription) {
        alert("Please fill in job title and job description");
        return;
    }

    if (!currentResume.summary) {
        alert("Please fill in summary with basic information about yourself");
        return;
    }

    aiData.isPrompting = true;
    const enhanced = await callAiEnhance();
    console.log(enhanced)

    const textarea = document.querySelector('textarea[name="summary"]');
    textarea.value = enhanced.enhancedText;
    syncCurrentResume();

    aiData.isPrompting = false;
}

export async function enhanceBullet(section, sectionType) {
    if (aiData.isPrompting) return;

    syncCurrentResume();
    if (!currentResume.jobTitle || !currentResume.jobDescription) {
        alert("Please fill in job title and job description");
        return;
    }

    // Get current section data (I am not reading it from the currentResume becase its a pain)

    const sectionData = {
        title: section.querySelector(`input[name="${sectionType}-title"]`).value,
        area: section.querySelector(`input[name="${sectionType}-area"]`).value,
        number: section.querySelector(`input[name="${sectionType}-number"]`).value,
        description: section.querySelector(`textarea[name="${sectionType}-description"]`).value
    }

    if (!sectionData.description) {
        alert("Please fill in the description that you want to enhance");
        return;
    }

    aiData.isPrompting = true;
    const enhanced = await callAiBullets(sectionType, sectionData);

    console.log(enhanced)
    const textarea = section.querySelector(`textarea[name="${sectionType}-description"]`);
    textarea.value = enhanced.enhancedText;
    syncCurrentResume();

    aiData.isPrompting = false;
}