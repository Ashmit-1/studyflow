# StudyFlow

A full-stack application for planning study routines, managing subjects, and tracking student progress with a React frontend and FastAPI backend.

## 📋 Project Overview

This repository contains:
- **Backend**: FastAPI REST API with SQLAlchemy models
- **Frontend**: React + Vite application
- **Database**: MySQL
- **OTP stroage**: Redis for one-time password verification

The app supports user registration, login, protected dashboard access, and subject CRUD operations.

---

## 🏗️ Project Structure

```
studyflow/
├── backend/                    # FastAPI backend server
│   ├── app.py                 # Main FastAPI application entry
│   ├── requirements.txt       # Python dependencies
│   ├── .env                   # Environment variables
│   ├── .env.example           # Environment example
│   └── src/
│       ├── auth/
│       │   ├── auth_utils.py
│       │   ├── otp.py
│       │   └── redis_client.py
│       ├── database.py        # SQLAlchemy database setup
│       ├── deps.py            # dependency injection
│       ├── email_service.py   # OTP email sender
│       ├── init_db.py         # database initialization script
│       ├── models.py          # ORM models
│       └── routes/
│           ├── login.py       # login endpoint
│           ├── studentlog.py  # student dashboard endpoint
│           └── subjects.py    # subject CRUD endpoints
└── FrontEnd/                   # React frontend application
    ├── package.json           # npm dependencies and scripts
    ├── vite.config.js         # Vite config
    ├── index.html             # HTML entry point
    └── src/
        ├── main.jsx          # React entry point
        ├── App.jsx           # route definitions
        ├── index.css         # global styles
        ├── components/
        │   ├── Sidebar.jsx
        │   ├── student_nav.jsx
        │   └── Toast.jsx
        ├── pages/
        │   ├── Home.jsx
        │   ├── Login.jsx
        │   ├── Register.jsx
        │   └── dashboard/
        │       ├── Student.jsx
        │       └── Subject.jsx
        ├── styles/
        │   ├── components/
        │   │   ├── sidebar.module.css
        │   │   ├── student_nav.module.css
        │   │   └── toast.module.css
        │   └── pages/
        │       ├── home.module.css
        │       ├── login.module.css
        │       ├── register.module.css
        │       ├── studentDash.module.css
        │       └── subject.module.css
        └── assets/
```

---

## 🧱 Architecture

```
Browser (React) -> FastAPI backend -> MySQL
                       |
                       -> Redis for OTP/session
```

---

## 🗄️ Database Schema

### Users
- `id`
- `username`
- `email`
- `password_hash`
- `full_name`
- `created_at`

### Subjects
- `id`
- `user_id`
- `subject_name`
- `exam_date`
- `difficulty`
- `created_at`

### Syllabus Topics
- `id`
- `subject_id`
- `topic_name`
- `priority_level`
- `estimated_hours`
- `is_completed`

### Study Plans
- `id`
- `user_id`
- `title`
- `start_date`
- `end_date`
- `created_at`

### Study Sessions
- `id`
- `study_plan_id`
- `topic_id`
- `study_date`
- `duration_minutes`
- `status`

### Additional Tables
- `important_questions`
- `resources`

---

## 🚀 Getting Started

### Prerequisites
- Python 3.8+
- Node.js 16+
- MySQL
- pip
- npm
- Docker (optional, for Redis)

### Backend Setup

1. Open a terminal in `backend`
   ```bash
   cd backend
   ```
2. Create a virtual environment
   ```bash
   python -m venv .venv
   ```
3. Activate the environment
   - Windows:
     ```bash
     .venv\Scripts\activate
     ```
   - macOS/Linux:
     ```bash
     source .venv/bin/activate
     ```
4. Install dependencies
   ```bash
   pip install -r requirements.txt
   ```
5. Configure `.env` with your database credentials
   ```ini
   SQL_URL=mysql+pymysql://root:password@localhost/<your_database_name>
   ```
6. Initialize the database
   ```bash
   python -m src.init_db
   ```
7. Start Redis (optional but required for OTP)
   ```bash
   docker run -d --name redis -p 6379:6379 redis
   ```
8. Run the backend
   ```bash
   uvicorn app:app --reload
   ```

### Frontend Setup

1. Open a terminal in `FrontEnd`
   ```bash
   cd FrontEnd
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Run the development server
   ```bash
   npm run dev
   ```
4. Open the app at `http://localhost:5173`

---

## 📡 API Endpoints

### Health Check
- `GET /`
- Response: `{"hello":"world"}`

### Register User
- `POST /users`
- Request JSON:
  ```json
  {
    "username": "string",
    "email": "user@example.com",
    "password": "string"
  }
  ```

### Login
- `POST /login`
- Request body: `application/x-www-form-urlencoded`
  - `username`
  - `password`
- Response JSON:
  ```json
  {
    "id": 1,
    "username": "string",
    "access_token": "<token>",
    "token_type": "bearer"
  }
  ```

### Request OTP
- `POST /request-otp`
- Request JSON:
  ```json
  {
    "email": "user@example.com"
  }
  ```

### Verify OTP
- `POST /verify-otp`
- Request JSON:
  ```json
  {
    "email": "user@example.com",
    "otp": "123456"
  }
  ```

### Student Dashboard
- `GET /student/{user_id}`
- Requires `Authorization: Bearer <access_token>`
- Response JSON:
  ```json
  {
    "id": 1,
    "username": "string"
  }
  ```

### Subject Endpoints
- `GET /student/{user_id}/subjects`
- `POST /student/{user_id}/subjects`
- `PUT /student/{user_id}/subjects/{subject_id}`
- `DELETE /student/{user_id}/subjects/{subject_id}`

---

## 🛠️ Technology Stack

### Backend
- FastAPI
- SQLAlchemy
- Pydantic
- bcrypt
- PyMySQL
- redis
- uvicorn

### Frontend
- React 19
- Vite
- Tailwind CSS
- React Router DOM
- ESLint

---

## ✅ Features

- User registration with OTP verification
- Login with JWT authentication
- Protected student dashboard endpoint
- Subject creation and retrieval APIs
- React landing page, auth pages, and dashboard UI
- Toast notifications and sidebar navigation
- Tailwind CSS styling

## 🔄 In Progress

- Subject management UI polish
- Study plan scheduling UI
- Progress tracking UI

## 🚀 Future Enhancements

- Logout and token refresh
- Password reset
- Study schedule calendar
- Topic priority visualization
- Progress analytics

---

## 📚 Usage Examples

Register a new user:

```bash
curl -X POST "http://localhost:8000/users" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "email": "john@example.com",
    "password": "secure_password123"
  }'
```

Login:

```bash
curl -X POST "http://localhost:8000/login" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=john_doe&password=secure_password123"
```

Get student dashboard:

```bash
curl -X GET "http://localhost:8000/student/1" \
  -H "Authorization: Bearer <access_token>"
```

---

## 📄 License

MIT License

---

**Last Updated:** 15 June 2026
