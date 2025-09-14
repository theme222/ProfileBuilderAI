export const exampleResumeContent = {
    personalInfo: {
        name: "Jane Smith",
        email: "jane.smith@example.com",
        phone: "555-123-4567",
        linkedin: "https://www.linkedin.com/in/janesmith",
        github: "https://github.com/janesmith",
        address: "456 Elm St, Metropolis, NY 10001",
    },
    jobTitle: "Frontend Developer",
    jobDescription: "We are seeking a passionate frontend developer to join our team and build modern, responsive web applications.",
    summary: "Detail-oriented engineering student with a passion for building user-friendly web applications and a strong foundation in JavaScript, HTML, and CSS.",
    education: [
        {
            title: "Metropolis Institute of Technology",
            area: "B.Tech in Computer Science",
            number: "2021 - 2025",
            description: "CGPA: 8.7/10, Dean's List, Coding Club President"
        }
    ],
    work: [
        {
            title: "Web Development Intern",
            area: "Innovatech Solutions",
            number: "May 2024 - July 2024",
            description: "Built a responsive dashboard using vanilla JS and CSS. Improved page load speed by 30%."
        }
    ],
    projects: [
        {
            title: "Smart Resume Builder",
            area: "HTML, CSS, JavaScript, Node.js",
            number: "2025",
            description: "Developed a web app that generates professional resumes using AI. Generated user friendly approach to making a job application"
        }
    ],
    skills: [
        { title: "JavaScript", area: "Programming Language", number: "8" },
        { title: "HTML/CSS", area: "Web", number: "7" },
        { title: "Node.js", area: "Backend", number: "8" },
        { title: "Git", area: "Tools", number: "6" }
    ],
    certifications: [
        {
            title: "AWS Certified Cloud Practitioner",
            area: "Amazon Web Services",
            number: "2024-03, ABC123XYZ",
            description: "Learned cloud fundamentals, AWS services, security, architecture, pricing, and support."
        }
    ]
};

function setHiddenIfEmpty(sectionId, dataArray) {
    const section = document.getElementById(sectionId);
    if (!dataArray || dataArray.length === 0)  section.classList.add('hidden');
    else section.classList.remove('hidden');
    return section;
}

function getListBulletsFromText(text) {
    const bulletList = (text || '')
        .split('\n').join(' ')  // Replace newlines with spaces
        .split('.')
        .filter(sentence => sentence.trim() !== '')
        .map(sentence => `<li>${sentence.trim()}.</li>`)
        .join('');
    return `<ul>${bulletList}</ul>`;
}

export function loadResumePreview(resumeData) {
    resumeData = exampleResumeContent; // For testing with example data
    // 1. Clear previous content to prevent duplication
    document.getElementById('preview-name').innerHTML = '';
    document.getElementById('preview-job-title').innerHTML = '';
    document.getElementById('preview-contact').innerHTML = '<h3 class="resume-section-title">CONTACT</h3>';
    document.getElementById('preview-education').innerHTML = '<h3 class="resume-section-title">EDUCATION</h3>';
    document.getElementById('preview-skills').innerHTML = '<h3 class="resume-section-title">SKILLS</h3>';
    document.getElementById('preview-work').innerHTML = '<h3 class="resume-section-title">WORK EXPERIENCE</h3>';

    // 2. Populate Header
    document.getElementById('preview-name').textContent = resumeData.personalInfo.name ? resumeData.personalInfo.name.toUpperCase() : '';
    document.getElementById('preview-job-title').textContent = resumeData.jobTitle ? resumeData.jobTitle.toUpperCase() : '';

    // 3. Populate Sidebar Sections
    const contactContainer = setHiddenIfEmpty('preview-contact', Object.values(resumeData.personalInfo || {}).filter(v => v));
    contactContainer.innerHTML += `
        <p>${resumeData.personalInfo.email || ''}</p>
        <p>${resumeData.personalInfo.phone || ''}</p>
        <p>${resumeData.personalInfo.address || ''}</p>
        <p>${resumeData.personalInfo.linkedin ? `<a href="${resumeData.personalInfo.linkedin}" target="_blank">LinkedIn</a>` : ''}</p>
        <p>${resumeData.personalInfo.github ? `<a href="${resumeData.personalInfo.github}" target="_blank">GitHub</a>` : ''}</p>
    `;

    const educationContainer = setHiddenIfEmpty('preview-education', resumeData.education);
    (resumeData.education || []).forEach(edu => {
        const eduEntry = document.createElement('div');
        eduEntry.className = 'sidebar-entry';
        eduEntry.innerHTML = `
            <h4>${edu.degree || edu.title || ''}</h4>
            <p>${edu.school || edu.area || ''}</p>
            <p>${(edu.start && edu.end) ? `${edu.start} - ${edu.end}` : (edu.date || '')}</p>
            <p>${edu.description || ''}</p>
        `;
        educationContainer.appendChild(eduEntry);
    });

    const skillsContainer = setHiddenIfEmpty('preview-skills', resumeData.skills);
    const skillsList = document.createElement('ul');
    skillsList.className = 'skills-list';
    (resumeData.skills || []).forEach(skill => {
        const skillItem = document.createElement('li');
        skillItem.innerHTML = `
            <p>${skill.title || skill}</p>
            <div><div style="width: ${(parseInt(skill.number) || 5) * 10}%"></div></div>
        `;
        skillsList.appendChild(skillItem);
    });
    skillsContainer.appendChild(skillsList);

    // 4. Populate Main Content Section (Work Experience)
    const workContainer = setHiddenIfEmpty('preview-work', resumeData.work);

    (resumeData.work || []).forEach(job => {
        const jobEntry = document.createElement('div');
        jobEntry.className = 'main-entry';
        // Simple string replacement for bullet points for this example
        const bullets = getListBulletsFromText(job.description);

        jobEntry.innerHTML = `
            <h4>${job.role || job.title || ''}</h4>
            <h5>
                ${job.area ? job.area + (job.number ? ' | ': '') : ''}
                ${(job.number) ?  (job.number) : ''}
            </h5>
            ${bullets}
        `;
        workContainer.appendChild(jobEntry);
    });

    // 5. Populate Main Content Section (Projects)
    const projectContainer = setHiddenIfEmpty('preview-projects', resumeData.projects);

    (resumeData.projects || []).forEach(project => {
        const projectEntry = document.createElement('div');
        const bullets = getListBulletsFromText(project.description);

        projectEntry.className = 'main-entry';
        projectEntry.innerHTML = `
            <h4>${project.title || ''}</h4>
            <h5>
                ${project.area ? project.area + (project.number ? ' | ': '') : ''}
                ${(project.number) ?  (project.number) : ''}
            </h5>
            ${bullets}
        `;
        projectContainer.appendChild(projectEntry);
    });


    // 5. Populate Main Content Section (Certifications)
    const certificationContainer = setHiddenIfEmpty('preview-certifications', resumeData.certifications);

    (resumeData.certifications || []).forEach(certification => {
        const certificationEntry = document.createElement('div');
        const bullets = getListBulletsFromText(certification.description);

        certificationEntry.className = 'main-entry';
        certificationEntry.innerHTML = `
            <h4>${certification.title || ''}</h4>
            <h5>
                ${certification.area ? certification.area + (certification.number ? ' | ': '') : ''}
                ${(certification.number) ?  (certification.number) : ''}
            </h5>
            ${bullets}
        `;
        certificationContainer.appendChild(certificationEntry);
    });

}
