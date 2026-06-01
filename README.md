# Study Planning Assistant

A full-stack application that helps users manage their study plans, track subjects, and organize study topics with AI-powered recommendations.

## 📋 Project Overview

This application consists of:
- **Backend**: FastAPI REST API with SQLAlchemy ORM
- **Frontend**: React with Vite build tool
- **Database**: MySQL

The system allows users to create accounts, manage multiple subjects, organize topics by priority, and track study progress.

---

## 🏗️ Project Structure

```
app/
├── backend/                    # FastAPI backend server
│   ├── app.py                 # Main application entry point
│   ├── requirements.txt        # Python dependencies
│   ├── .env                   # Environment configuration
│   └── src/
│       ├── __init__.py
│       ├── database.py        # Database connection setup
│       ├── deps.py            # Dependency injection
│       ├── init_db.py         # Database initialization
│       ├── models.py          # SQLAlchemy models
│       └── schemas.py         # Pydantic request/response schemas
│
└── frontEnd/                   # React frontend application
    ├── package.json           # NPM dependencies
    ├── vite.config.js         # Vite configuration
    ├── eslint.config.js       # ESLint configuration
    ├── index.html             # HTML entry point
    └── src/
        ├── main.jsx           # React entry point
        ├── App.jsx            # Main component
        ├── index.css          # Application styles
        ├── components/
        │   ├── Sidebar.jsx    # Sidebar for student page 
        │   ├── student_nav.jsx # Navigation bar for student page
        │   └── Toast.jsx      # Toast notification component
        ├── pages/
        │   ├── Home.jsx       # Landing page
        │   ├── Login.jsx      # User login page
        │   ├── Register.jsx   # User registration page
        │   └── dashboard/
        │       └── Student.jsx # Student dashboard view
        ├── styles/            # Component-specific styles
        │   ├── components/
        │   │   ├── toast.module.css
        │   │   ├── sidebar.module.css
        │   │   └── student_nav.module.css
        │   └── pages/
        │       ├── home.module.css
        │       ├── login.module.css
        │       ├── register.module.css
        │       └── studentDash.module.css          
        │
        │  
        └── assets/            # Static assets
```

---

## 🧱 Architecture diagram

```
Browser (React) -> FastAPI backend -> MySQL database
    |                 |
    |-- JWT token --> |-- SQLAlchemy ORM
    |                 |
    |-- localStorage  |
```

---

## 🗄️ Database Schema

### User Table
- `id` (Integer, Primary Key)
- `username` (String, Unique, Required)
- `email` (String, Unique, Required)
- `password_hash` (Text, Required)
- `full_name` (String)
- `created_at` (Timestamp)

### Subject Table
- `id` (Integer, Primary Key)
- `user_id` (Foreign Key to User)
- `subject_name` (String, Required)
- `exam_date` (Date)
- `difficulty` (Enum: easy, medium, hard)
- `created_at` (Timestamp)

### SyllabusTopic Table
- `id` (Integer, Primary Key)
- `subject_id` (Foreign Key to Subject)
- `topic_name` (String, Required)
- `priority_level` (Enum: low, medium, high)
- `estimated_hours` (Integer)
- `is_completed` (Boolean)

### Additional Tables
- **StudyPlan**: Study schedules and plans
- **Progress**: Track completion and progress
- **AIRecommendation**: AI-generated study recommendations

---

## 🚀 Getting Started

### Prerequisites
- Python 3.8+
- Node.js 16+
- MySQL 5.7+
- pip
- npm

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create a virtual environment:**
   ```bash
   python -m venv .venv
   ```

3. **Activate the virtual environment:**
   - On Windows:
     ```bash
     .venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```bash
     source .venv/bin/activate
     ```

4. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

5. **Configure environment variables:**
   - Update `.env` file with your MySQL database credentials:
     ```
     SQL_URL=mysql+pymysql://root:password@localhost/app
     ```

6. **Initialize database:**
   ```bash
   python -m src.init_db
   ```

7. **Run the backend server:**
   ```bash
   uvicorn app:app --reload
   ```
   The API will be available at `http://localhost:8000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd FrontEnd
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173`

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Lint code:**
   ```bash
   npm run lint
   ```

---

## 📡 API Endpoints

### Health Check
- **GET** `/`
  - Returns: `{"hello": "world"}`

### Authentication & User Management

#### User Registration
- **POST** `/users`
- **Request Body:**
  ```json
  {
    "username": "string",
    "email": "user@example.com",
    "password": "string"
  }
  ```
- **Response:** 
  ```json
  {
    "id": 1,
    "username": "string",
    "email": "user@example.com"
  }
  ```
- **Status Codes:**
  - `200 OK` - User created successfully
  - `400 Bad Request` - Username or email already exists
  - `400 Bad Request` - Invalid input

#### User Login
- **POST** `/login`
- **Request Body:** (OAuth2 form data)
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **Response:**
  ```json
  {
    "id": 1,
    "username": "string",
    "access_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
    "token_type": "bearer"
  }
  ```
- **Status Codes:**
  - `200 OK` - Login successful
  - `404 Not Found` - User not found
  - `401 Unauthorized` - Invalid password

#### Get Student Dashboard
- **GET** `/student/{user_id}`
- **Headers:** `Authorization: Bearer <access_token>`
- **Response:**
  ```json
  {
    "id": 1,
    "username": "string",
    "email": "user@example.com",
    "full_name": "string",
    "created_at": "2024-01-01T00:00:00",
    "subjects": [...],
    "study_plans": [...],
    "progress": [...],
    "recommendations": [...]
  }
  ```
- **Status Codes:**
  - `200 OK` - Data retrieved successfully
  - `401 Unauthorized` - Invalid or missing token
  - `403 Forbidden` - Not authorized to view this user's data
  - `404 Not Found` - User not found

---

## 🔧 Backend Technology Stack

- **FastAPI**: Modern web framework for building APIs
- **SQLAlchemy**: SQL toolkit and Object-Relational Mapping
- **Pydantic**: Data validation using Python type annotations
- **bcrypt**: Password hashing and verification
- **python-dotenv**: Environment variable management
- **mysql-connector-python**: MySQL database driver

---

## 🎨 Frontend Technology Stack

- **React 19**: UI library
- **Vite**: Next-generation frontend build tool
- **ESLint**: Code quality and style checking
- **CSS3**: Styling

---

## 🔐 Security Features

- **Password Hashing**: Uses bcrypt with salt rounds for secure password storage
- **JWT Authentication**: Token-based authentication for secure API access
- **OAuth2 Integration**: OAuth2PasswordBearer for protected endpoints
- **CORS Middleware**: Configured to handle cross-origin requests
- **Input Validation**: Pydantic models validate all incoming requests
- **Unique Constraints**: Username and email uniqueness enforced at database level
- **Authorization**: User-specific data access control with token verification

---

## 📸 Preview

![Home page](screenshots/Home_screenshot.png)

![Login page](screenshots/Login_screenshot.png)

---

## 📝 Features

### Completed ✅
- ✅ User registration with secure password hashing
- ✅ User login with JWT token generation
- ✅ JWT token verification and authorization
- ✅ Student dashboard endpoint with protected access
- ✅ Database models for subjects, topics, study plans, and progress
- ✅ Landing page with feature highlights (StudyFlow branding)
- ✅ User registration form with validation
- ✅ User login form with error handling
- ✅ Toast notification component
- ✅ Responsive CSS styling
- ✅ CORS enabled for frontend integration

### In Development 🔄
- 🔄 Subject creation and management endpoints
- 🔄 Topic CRUD operations
- 🔄 Study plan management
- 🔄 Progress tracking endpoints

### Future Enhancements 🚀
- 🚀 Subject management UI pages
- 🚀 Topic priority visualization
- 🚀 Study plan scheduler
- 🚀 Progress dashboard with statistics
- 🚀 AI-powered study recommendations
- 🚀 Token refresh endpoint
- 🚀 User logout functionality
- 🚀 Email verification
- 🚀 Password reset functionality

---

## 🐛 Error Handling

The API returns appropriate HTTP status codes:
- `200` - Success
- `400` - Bad Request (invalid input, duplicate entries)
- `404` - Not Found
- `500` - Server Error

---

## 📚 Usage Examples

### Register a New User
```bash
curl -X POST "http://localhost:8000/users" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "email": "john@example.com",
    "password": "secure_password123"
  }'
```

### User Login
```bash
curl -X POST "http://localhost:8000/login" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=john_doe&password=secure_password123"
```

### Access Student Dashboard
```bash
curl -X GET "http://localhost:8000/student/1" \
  -H "Authorization: Bearer <access_token>"
```

### Frontend Usage
1. Navigate to `http://localhost:5173`
2. Click "Get Started" or "Register" to create a new account
3. Login with your credentials
4. Access your student dashboard

---

## 📞 Support

For issues or questions, please refer to the individual README files in the `backend` and `FrontEnd` directories.

---

## 📄 License

This project is open source and available under the MIT License.

---

**Last Updated**: 01 June 2026
---