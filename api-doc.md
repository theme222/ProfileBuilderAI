
# Backend API Documentation: 

## Custom Session Auth
**Base URL : `http://localhost:3001/api/auth`**

---

### 1. User Registration

Creates a new user account with a plain text password. On success, it generates a random session token, saves it to the user's document, and sets it as a cookie.

* **Endpoint**: `POST /register`
* **Request Body**: `JSON`
    ```json
    {
      "username": "newuser",
      "email": "new@example.com",
      "password": "plainpassword123"
    }
    ```
* **Success Response (201 Created)**:
    * Sets a `token` cookie in the browser.
    * Returns the new user's information, including their session token.
    ```json
    {
      "_id": "68c3db33b3e2b9a82ddbc735",
      "username": "newuser",
      "email": "new@example.com",
      "token": "a1b2c3d4e5f6..."
    }
    ```
* **Error Responses**:
    * **400 Bad Request**: If fields are missing or if the username/email already exists.

---

### 2. User Login

Authenticates an existing user by comparing plain text passwords. On success, it generates a new session token, saves it to the user's document, and sets it as a cookie.

* **Endpoint**: `POST /login`
* **Request Body**: `JSON`
    ```json
    {
      "email": "new@example.com",
      "password": "plainpassword123"
    }
    ```
* **Success Response (200 OK)**:
    * Sets a `token` cookie in the browser.
    * Returns the logged-in user's information, including their new session token.
    ```json
    {
      "_id": "68c3db33b3e2b9a82ddbc735",
      "username": "newuser",
      "email": "new@example.com",
      "token": "f6e5d4c3b2a1..."
    }
    ```
* **Error Responses**:
    * **401 Unauthorized**: If the email or password is incorrect.

---

### 3. Get User Profile

Retrieves the profile of the currently logged-in user. **This is a protected route.**

* **Endpoint**: `GET /profile`
* **Authentication**:
    * The browser must send the `token` cookie.
    * The server reads this token and searches the database to find a user with a matching token.
* **Request Body**: None.
* **Success Response (200 OK)**:
    * Returns the current user's information (excluding the password).
    ```json
    {
      "_id": "68c3db33b3e2b9a82ddbc735",
      "username": "newuser",
      "email": "new@example.com",
      "token": "f6e5d4c3b2a1..."
    }
    ```
* **Error Responses**:
    * **401 Unauthorized**: If no valid token cookie is sent or if no user is found with that token.

---

## Resume Management (CRUD)
**Base URL : `http://localhost:3001/api/resumes`**

---

### 1. Get All Resumes for a User
Retrieves a list of all resumes created by the currently logged-in user.

* **Endpoint**: `GET /`
* **Request Body**: None.
* **Success Response (200 OK)**:
    * Returns an array of resume objects.
    ```json
    [
      {
        "_id": "68c5906f75f0bce3d8e830bf",
        "user": "68c3df4050a7149a5478c1b1",
        "title": "Software Developer Resume",
        "summary": "A passionate developer...",
        "createdAt": "2025-09-14T15:40:31.899Z"
      }
    ]
    ```
* **Error Responses**:
    * **401 Unauthorized**: If no valid token is provided.

### 2. Create a New Resume
Creates a new resume document associated with the logged-in user.

* **Endpoint**: `POST /`
* **Request Body**: `JSON`
    ```json
    {
      "title": "My New Resume",
      "summary": "A brief summary of my professional background.",
      "skills": ["Python", "Django", "SQL"]
    }
    ```
* **Success Response (201 Created)**:
    * Returns the complete resume object as saved in the database.
    ```json
    {
      "_id": "68c5a12345f0bce3d8e830c0",
      "user": "68c3df4050a7149a5478c1b1",
      "title": "My New Resume",
      "summary": "A brief summary...",
      "createdAt": "2025-09-14T16:05:00.123Z"
    }
    ```
* **Error Responses**:
    * **400 Bad Request**: If the request body has issues.
    * **401 Unauthorized**: If no valid token is provided.

### 3. Get a Single Resume
Retrieves a specific resume by its unique ID.

* **Endpoint**: `GET /:id`
* **URL Parameter**: `id` (string, required).
* **Success Response (200 OK)**: Returns the full resume object.
* **Error Responses**:
    * **401 Unauthorized**: If the user does not own the resume.
    * **404 Not Found**: If no resume with that ID exists.

### 4. Update a Resume
Updates an existing resume by its unique ID.

* **Endpoint**: `PUT /:id`
* **URL Parameter**: `id` (string, required).
* **Request Body**: `JSON` with fields to be updated.
    ```json
    {
      "summary": "An updated and more professional summary."
    }
    ```
* **Success Response (200 OK)**: Returns the complete, updated resume object.
* **Error Responses**:
    * **401 Unauthorized**: If the user does not own the resume.
    * **404 Not Found**: If no resume with that ID exists.

### 5. Delete a Resume
Deletes a specific resume by its unique ID.

* **Endpoint**: `DELETE /:id`
* **URL Parameter**: `id` (string, required).
* **Success Response (200 OK)**:
    ```json
    {
      "message": "Resume deleted successfully"
    }
    ```
* **Error Responses**:
    * **401 Unauthorized**: If the user does not own the resume.
    * **404 Not Found**: If no resume with that ID exists.

---

## AI Enhancements
**Base URL**: `http://localhost:3001/api/resumes`

### 1. Enhance a Resume Summary
Uses AI to rewrite a summary, optionally tailoring it to a job description.

* **Endpoint**: `POST /:id/enhance`
* **Request Body**: `JSON`
    ```json
    {
      "summary": "I am a software developer.",
      "jobTitle": "Senior Frontend Engineer",
      "jobDescription": "Seeking an engineer with 5+ years of React experience..."
    }
    ```
    * `summary` (string): **Required.**
    * `jobTitle`, `jobDescription` (strings): **Optional.**
* **Success Response (200 OK)**:
    ```json
    {
      "enhancedText": "Results-oriented software developer with a strong background in frontend technologies...\n"
    }
    ```

### 2. Generate Enhanced Description for a Resume Section
Uses AI to rewrite the description for any resume section (work, education, etc.), optionally tailoring it to a job.

* **Endpoint**: `POST /:id/description`
* **Request Body**: `JSON`
    ```json
    {
      "sectionType": "work",
      "data": {
        "title": "Software Intern",
        "area": "Tech Solutions Inc.",
        "number": "Jun 2024 - Aug 2024",
        "description": "I fixed bugs and helped with a new feature."
      },
      "context": {
        "jobTitle": "Junior Frontend Developer (React)",
        "jobDescription": "Seeking a developer skilled in React..."
      }
    }
    ```
    * `sectionType` (string): **Required.** (`work`, `education`, `projects`, `skill`, `certification`).
    * `data` (object): **Required.** Contains the details of the item.
    * `context` (object): **Optional.** Contains job details for tailoring.
* **Success Response (200 OK)**:
    ```json
    {
      "enhancedText": "Collaborated with a team to resolve critical bugs...\nDeveloped a new user-facing feature using React...\n"
    }
    ```