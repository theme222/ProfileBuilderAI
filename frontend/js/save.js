import { createResume, deleteResume, saveResume } from "./api.js";
import { authData } from "./auth.js";
import { resumeList, syncCurrentResume } from "./resume.js";

export let deleteList = []; // Store resume that will be deleted soon

export const saveOptions = {
    autosave: true,
};

export function evaluateSaveQueue() { // Gets called every 5 seconds
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

    deleteList = [] // Clear
}


