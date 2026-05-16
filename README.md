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
└── FrontEnd/                   # React frontend application
    ├── package.json           # NPM dependencies
    ├── vite.config.js         # Vite configuration
    ├── eslint.config.js       # ESLint configuration
    ├── index.html             # HTML entry point
    └── src/
        ├── main.jsx           # React entry point
        ├── App.jsx            # Main component
        ├── App.css            # Application styles
        └── assets/            # Static assets
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

### User Management

#### Create User
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

#### Get User
- **GET** `/users/{user_id}`
- **Response:**
  ```json
  {
    "id": 1,
    "username": "string",
    "email": "user@example.com"
  }
  ```
- **Status Codes:**
  - `200 OK` - User found
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
- **CORS Middleware**: Configured to handle cross-origin requests
- **Input Validation**: Pydantic models validate all incoming requests
- **Unique Constraints**: Username and email uniqueness enforced at database level

---

## 📝 Features

- ✅ User registration with secure password hashing
- ✅ User profile management
- ✅ Subject creation and management
- ✅ Topic organization with priority levels
- ✅ Study time estimation
- ✅ Progress tracking
- ✅ AI-powered study recommendations
- ✅ CORS enabled for frontend integration

---

## 🐛 Error Handling

The API returns appropriate HTTP status codes:
- `200` - Success
- `400` - Bad Request (invalid input, duplicate entries)
- `404` - Not Found
- `500` - Server Error

---

## 📚 Usage Example

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

### Get User Details
```bash
curl -X GET "http://localhost:8000/users/1"
```

---

## 🚀 Future Enhancements

- [ ] Authentication endpoints (login, logout, token refresh)
- [ ] Additional subject management endpoints
- [ ] Study topic CRUD operations
- [ ] Progress tracking endpoints
- [ ] AI recommendation engine
- [ ] User dashboard with statistics
- [ ] Mobile-responsive frontend improvements
- [ ] Test coverage
- [ ] API documentation with Swagger UI

---

## 📞 Support

For issues or questions, please refer to the individual README files in the `backend` and `FrontEnd` directories.

---

## 📄 License

This project is open source and available under the MIT License.

---

**Last Updated**: May 2026
