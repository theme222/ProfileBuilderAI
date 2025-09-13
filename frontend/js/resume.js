export const exampleResumeContent = {
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "555-123-4567",
    linkedin: "https://www.linkedin.com/in/janesmith",
    github: "https://github.com/janesmith",
    address: "456 Elm St, Metropolis, NY 10001",
    jobTitle: "Frontend Developer",
    jobDescription: "We are seeking a passionate frontend developer to join our team and build modern, responsive web applications.",
    summary: "Detail-oriented engineering student with a passion for building user-friendly web applications and a strong foundation in JavaScript, HTML, and CSS.",
    education: [
        {
            title: "Metropolis Institute of Technology",
            area: "B.Tech in Computer Science",
            date: "2021 - 2025",
            description: "CGPA: 8.7/10, Dean's List, Coding Club President"
        }
    ],
    work: [
        {
            title: "Web Development Intern",
            area: "Innovatech Solutions",
            date: "May 2024 - July 2024",
            description: "Built a responsive dashboard using vanilla JS and CSS. Improved page load speed by 30%."
        }
    ],
    projects: [
        {
            title: "Smart Resume Builder",
            area: "HTML, CSS, JavaScript, Node.js",
            year: "2025",
            description: "Developed a web app that generates professional resumes using AI."
        }
    ],
    skills: [
        { name: "JavaScript", category: "Programming Language", details: "Advanced" },
        { name: "HTML/CSS", category: "Web", details: "Advanced" },
        { name: "Node.js", category: "Backend", details: "Intermediate" },
        { name: "Git", category: "Tools", details: "Proficient" }
    ],
    certifications: [
        {
            name: "AWS Certified Cloud Practitioner",
            issuer: "Amazon Web Services",
            date: "2024-03",
            credentialId: "ABC123XYZ"
        }
    ]
};



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
    document.getElementById('preview-name').textContent = resumeData.name ? resumeData.name.toUpperCase() : '';
    document.getElementById('preview-job-title').textContent = resumeData.jobTitle ? resumeData.jobTitle.toUpperCase() : '';

    // 3. Populate Sidebar Sections
    const contactContainer = document.getElementById('preview-contact');
    contactContainer.innerHTML += `
        <p>${resumeData.email || ''}</p>
        <p>${resumeData.phone || ''}</p>
        <p>${resumeData.address || ''}</p>
        <p>${resumeData.linkedin ? `<a href="${resumeData.linkedin}" target="_blank">LinkedIn</a>` : ''}</p>
        <p>${resumeData.github ? `<a href="${resumeData.github}" target="_blank">GitHub</a>` : ''}</p>
    `;

    const educationContainer = document.getElementById('preview-education');
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
    
    const skillsContainer = document.getElementById('preview-skills');
    const skillsList = document.createElement('ul');
    skillsList.className = 'skills-list';
    (resumeData.skills || []).forEach(skill => {
        const skillItem = document.createElement('li');
        skillItem.textContent = skill.name || skill;
        skillsList.appendChild(skillItem);
    });
    skillsContainer.appendChild(skillsList);

    // 4. Populate Main Content Section (Work Experience)
    const workContainer = document.getElementById('preview-work');
    (resumeData.work || []).forEach(job => {
        const jobEntry = document.createElement('div');
        jobEntry.className = 'main-entry';
        // Simple string replacement for bullet points for this example
        const descriptionBullets = (job.description || '')
            .split('.')
            .filter(sentence => sentence.trim() !== '')
            .map(sentence => `<li>${sentence.trim()}.</li>`)
            .join('');

        jobEntry.innerHTML = `
            <h4>${job.role || job.title || ''}</h4>
            <h5>${(job.company || job.area || '')}${(job.start || job.date) ? ' / ' + (job.start || job.date) : ''}${job.end ? ' - ' + job.end : ''}</h5>
            <ul>${descriptionBullets}</ul>
        `;
        workContainer.appendChild(jobEntry);
    });
}
