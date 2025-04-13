Here’s a simple and clear **README.md** for your school database backend with authentication using Passport.js:

---

```markdown
# 🏫 School Database API (with Passport.js Auth)

This is a backend application built using **Node.js**, **Express**, and **MongoDB**. It allows user registration and login using **Passport.js local strategy**. The app also includes student and teacher routes with session-based authentication.

---

## 📦 Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- Passport.js (Local Strategy)
- bcrypt for password hashing
- express-session for session handling
- body-parser for parsing HTTP requests

---

## 📁 Folder Structure

```
├── server.js               # Main Express server
├── authentication.js      # Passport strategy configuration
├── db1.js                 # MongoDB connection logic
├── LoginUser.js           # Mongoose schema for login
├── student.js             # Student schema
├── teacher.js             # Teacher schema
├── stuRuth.js             # Student routes
├── teacRuth.js            # Teacher routes
```

---

## 🔧 Setup & Run

### 1. Clone the repo
```bash
git clone <repo-url>
cd <project-folder>
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure MongoDB
Edit `db1.js` to connect to your MongoDB instance.

### 4. Start the server
```bash
node server.js
```

Server will run on: `http://localhost:8081`

---

## 🚀 API Endpoints

### ✅ Register User
`POST /register`  
**Body (JSON):**
```json
{
  "username": "john123",
  "password": "mypassword"
}
```

---

### 🔐 Login User
`POST /login`  
**Form URL Encoded (x-www-form-urlencoded in Postman):**
- `username`: john123  
- `password`: mypassword

**Success Redirect:** `/dashboard`  
**Failure Redirect:** `/login-fail`

---

### 📄 Dashboard
`GET /dashboard`  
> Protected route. Only accessible if logged in.

---

### ❌ Logout
`GET /logout`  
> Logs the user out of the session.

---

## 📝 Notes

- Passwords are hashed with bcrypt before saving.
- Passport LocalStrategy is used for login authentication.
- Session-based authentication using express-session.
- Routes like `/student` and `/teacher` should be added in their respective `stuRuth.js` and `teacRuth.js` files.

---

## 👨‍💻 Author

Apurb Mishra

```

---

Let me know if you want me to include examples of `/student` and `/teacher` routes too.