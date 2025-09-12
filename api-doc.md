# Backend API Documentation: Authentication

## Base URL
All authentication endpoints are prefixed with: `http://localhost:3001/api/auth`

---

### 1. User Registration

Creates a new user account. On success, it also logs the user in by setting a secure `httpOnly` cookie.

* **Endpoint**: `POST /register`
* **Request Body**: `JSON`
    ```json
    {
      "username": "testuser",
      "email": "test@example.com",
      "password": "password123"
    }
    ```
* **Success Response (201 Created)**:
    * Sets a `token` cookie in the browser.
    * Returns the new user's information (without the password).
    ```json
    {
      "_id": "60d5ec49f72e2e1f48a3b9a2",
      "username": "testuser",
      "email": "test@example.com"
    }
    ```
* **Error Responses**:
    * **400 Bad Request**: If fields are missing or if the username/email already exists.
      ```json
      { "message": "Please provide all required fields" }
      // or
      { "message": "Username or email already exists" }
      ```

---

### 2. User Login

Authenticates an existing user. On success, it creates a session by setting a secure `httpOnly` cookie.

* **Endpoint**: `POST /login`
* **Request Body**: `JSON`
    ```json
    {
      "email": "test@example.com",
      "password": "password123"
    }
    ```
* **Success Response (200 OK)**:
    * Sets a `token` cookie in the browser.
    * Returns the logged-in user's information.
    ```json
    {
      "_id": "60d5ec49f72e2e1f48a3b9a2",
      "username": "testuser",
      "email": "test@example.com"
    }
    ```
* **Error Responses**:
    * **401 Unauthorized**: If the email or password is incorrect.
      ```json
      { "message": "Invalid credentials" }
      ```

---

### 3. Get User Profile

Retrieves the profile of the currently logged-in user. **This is a protected route.**

* **Endpoint**: `GET /profile`
* **Authentication**:
    * The browser must automatically send the `token` cookie that was received from `/login` or `/register`. No manual `Authorization` header is needed.
* **Request Body**: None.
* **Success Response (200 OK)**:
    * Returns the current user's information.
    ```json
    {
      "_id": "60d5ec49f72e2e1f48a3b9a2",
      "username": "testuser",
      "email": "test@example.com"
    }
    ```
* **Error Responses**:
    * **401 Unauthorized**: If the user is not logged in (no valid cookie was sent).
      ```json
      { "message": "Not authorized, no token" }
      ```