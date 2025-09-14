
# Backend API Documentation: 

## Custom Session Auth
## Base URL : `http://localhost:3001/api/auth`

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
**Base URL**: `http://localhost:3001/api/resumes`

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

---

### 1. Enhance a Resume Summary
Uses AI to rewrite and improve the summary of a specific resume.

* **Endpoint**: `POST /:id/enhance`
* **URL Parameter**: `id` (string, required): The ID of the resume containing the summary.
* **Request Body**: `JSON`
    ```json
    {
      "summary": "I am a programmer and I worked on some web stuff."
    }
    ```
* **Success Response (200 OK)**:
    * Returns a JSON object with the AI-generated summary.
    ```json
    {
      "improvedSummary": "Detail-oriented software developer with a proven track record in web application development. Adept at leveraging modern technologies to build intuitive and efficient user experiences."
    }
    ```
* **Error Responses**:
    * **400 Bad Request**: If the `summary` field is missing.
    * **401 Unauthorized**: If no valid token is provided.
    * **500 Internal Server Error**: If the AI service fails.

### 2. Generate Work Experience Bullet Points
Uses AI to generate professional, achievement-oriented bullet points for a work experience entry.

* **Endpoint**: `POST /:id/bullets`
* **URL Parameter**: `id` (string, required): The ID of the resume this experience belongs to.
* **Request Body**: `JSON`
    ```json
    {
      "jobTitle": "Junior Developer",
      "company": "Tech Solutions Inc.",
      "experienceDescription": "I fixed bugs and helped build new pages using React."
    }
    ```
* **Success Response (200 OK)**:
    * Returns a JSON object with an array of AI-generated bullet points.
    ```json
    {
      "bullets": [
        "Spearheaded the development of new user-facing features using React.js, resulting in a 15% increase in user engagement.",
        "Collaborated with senior developers to diagnose and resolve critical bugs, improving application stability by 30%.",
        "Contributed to the maintenance of a large-scale codebase, ensuring adherence to best practices and coding standards."
      ]
    }
    ```
* **Error Responses**:
    * **400 Bad Request**: If required fields are missing.
    * **401 Unauthorized**: If no valid token is provided.
    * **500 Internal Server Error**: If the AI service fails.