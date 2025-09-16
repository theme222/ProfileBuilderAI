import { createResume, deleteResume, saveResume } from "./api.js";
import { authData } from "./auth.js";
import { resumeList, syncCurrentResume } from "./resume.js";

export let deleteList = []; // Store resume that will be deleted soon

export const saveOptions = {
    autosave: false,
    timeOfSave: null
};

export function renderSaveButtonAndInfo() {
    const button = document.querySelector("#autosave-row button")
    const span = document.querySelector("#autosave-row span")

    if (saveOptions.autosave) {
        button.classList.remove("btn-outline-error");
        button.classList.add("btn-success");
    }
    else {
        button.classList.remove("btn-success");
        button.classList.add("btn-outline-error");
    }

    if (!authData.isAuthenticated) {
        span.textContent = "Please Login To Enable Autosave";
        span.classList.add("txt-error")
        span.classList.remove("txt-success")
    }
    else if (!saveOptions.autosave) {
        span.textContent = "Currently Not Autosaving";
        span.classList.add("txt-error")
        span.classList.remove("txt-success")
    }
    else if (!saveOptions.timeOfSave) {
        span.textContent = "Waiting To Autosave..."
        span.classList.add("txt-error")
        span.classList.remove("txt-success")
    }
    else {
        span.textContent = `Last Autosaved At ${saveOptions.timeOfSave.toLocaleString("th-TH")}`
        span.classList.add("txt-success")
        span.classList.remove("txt-error")
    }
}

export function evaluateSaveQueue() { // Gets called every 5 seconds
    if (saveOptions.autosave === false) return;
    if (!authData.isAuthenticated) return; // If not currently authenticated then return
    syncCurrentResume();

    for (const resume of resumeList) {
        if (resume.isSynced === true) continue;
        if (resume._id === null) createResume(resume);
        else saveResume(resume);
    }

    for (const resume of deleteList) {
        if (resume._id === null) continue;
        deleteResume(resume);
    }

    deleteList = []; // Clear
    saveOptions.timeOfSave = new Date();
    renderSaveButtonAndInfo();
}


