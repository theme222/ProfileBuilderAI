# ProfileBuilderAI 🚀  

**ProfileBuilderAI** is an AI-powered resume and profile builder designed to help students and professionals craft compelling resumes, CVs, and portfolios. It goes beyond formatting by enhancing content with AI, ensuring resumes are clear, impactful, and ATS-friendly.  

Built as part of **CEDT 2110222 – Semester 1/2025 Final Project (Group 37)**, Faculty of Engineering, Chulalongkorn University.  

---

## 📌 Table of Contents  
- [Background](#-background)  
- [Features](#-features)  
- [Tech Stack](#-tech-stack)  
- [Usage Workflow](#-usage-workflow)  
- [Project Requirements](#-project-requirements)  
- [Installation & Setup](#-installation--setup)  
- [Deployment](#-deployment)  
- [Team Members](#-team-members)  
- [License](#-license)  

---

## 📖 Background  
In today’s competitive job market, resumes are critical for landing internships and jobs. Many Computer Engineering and Digital Technology students struggle not with skills, but with communicating their abilities effectively.  

**ProfileBuilderAI** bridges this gap by:  
- Helping students craft resumes with strong action verbs and professional tone.  
- Leveraging **Google Gemini AI** to enhance bullet points and summaries.  
- Saving time and reducing stress while improving chances of passing ATS filters.  

---

## ✨ Features  
- 🔑 **Authentication** – Secure sign-up/login with saved resume data.  
- 📂 **Resume Management** – Create, edit, copy, or delete resumes.  
- 📝 **Data Entry** – Structured sections (Personal Info, Education, Work Experience, Projects, Skills, Certifications).  
- 🤖 **AI Enhancement** – Use Gemini AI to refine summaries & bullet points.  
- 👀 **Preview & Styling** – Live preview with professional templates.  
- 💾 **Export** – Save final resume as PDF.  
- 📱 **Responsive Design** – Works seamlessly across mobile, tablet, and desktop.  

---

## 🛠 Tech Stack  
- **Frontend:** React, Tailwind CSS  
- **Backend:** Node.js, Express  
- **Database:** MongoDB  
- **AI Model:** Google Gemini 1.5 Flash API  
- **Deployment:** AWS EC2  
- **Collaboration Tools:** GitHub, Trello, Discord, VSCode + GitHub Copilot  

---

## 🔄 Usage Workflow  
1. **Login / Signup** → User account creation & authentication.  
2. **Resume Dashboard** → Manage multiple resumes.  
3. **Data Entry** → Fill structured forms.  
4. **AI Enhancement** → Improve text clarity & impact.  
5. **Preview** → Real-time formatted template.  
6. **Export** → Download as PDF.  

---

## ✅ Project Requirements  
- **SPA (Single Page Application)** – Runs without full page reloads.  
- **CRUD Functionality** – Create, Read, Update, Delete resumes.  
- **LLM API Integration** – Google Gemini AI for text enhancement.  
- **Responsive UI** – Flexible across devices.  
- **Challenge Requirement** – Deployed successfully on AWS EC2.  

---

## ⚙️ Installation & Setup  

### Prerequisites  
- [Node.js](https://nodejs.org/) (v16+)  
- [MongoDB](https://www.mongodb.com/)  
- Google Gemini API Key  

### Steps  
```bash
# Clone repository
git clone https://github.com/theme222/ProfileBuilderAI.git
cd ProfileBuilderAI

# Install dependencies
npm install

# Start backend server
npm run server

# Start frontend client
npm start
```

App will run at: **http://localhost:3000/**  

---

## ☁️ Deployment  
The project is deployed on **AWS EC2**.  
- Backend: Runs as a persistent Node.js service.  
- Frontend: Statically hosted on port `3001`.  

---

## 👩‍💻 Team Members – Group 37  
- **Sira Tongsima** – Project Lead, Frontend Developer  
- **Patsakorn Sitpathom** – Backend Developer  
- **Pasin Plinsut** – Frontend Developer  
- **Pavaris Pholkaew** – Frontend Developer  
- **Nontapat Auetrongjit** – Backend Developer  
- **Chayapol Champoonta** – Frontend Developer  

---

## 📜 License  
This project was developed as part of **2110222 – Introduction to Computer Engineering and Digital Technology, Semester 1/2025**.  
Faculty of Engineering, **Chulalongkorn University**.  
