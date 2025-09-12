Of course. It's great that all the tests passed\! Now, let's create the final documentation for the new, refactored API.

This new version reflects all the changes we made: no `bcrypt`, `jsonwebtoken`, or `cookie-parser`, and using a simple database token for sessions.

-----

## Instructions 📝

1.  Copy all the text inside the box below.
2.  Paste it into a new file in your code editor.
3.  Save the file as `api-docs-v2.md`.

-----

````markdown
# Backend API Documentation: Custom Session Auth

## Base URL
All authentication endpoints are prefixed with: `http://localhost:3001/api/auth`

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

````