# Task Management Backend API

A complete RESTful API for task management with user authentication and Excel export functionality.

## Features

### Authentication
- ✅ User signup with name, email, and password
- ✅ User login with JWT token generation
- ✅ Password hashing with bcrypt
- ✅ Protected routes with JWT middleware
- ✅ User profile management
- ✅ Token verification

### Task Management
- ✅ Create tasks with author, division, task description, and date
- ✅ Get all tasks with pagination and filters
- ✅ Get single task by ID
- ✅ Update tasks
- ✅ Delete tasks
- ✅ Task statistics (by status, division, priority)
- ✅ **Excel export** - Download all tasks as Excel file with one click

## Tech Stack

- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB ODM
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation
- **cors** - Cross-Origin Resource Sharing
- **ExcelJS** - Excel file generation
- **dotenv** - Environment variables

## Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance like MongoDB Atlas)

### Setup Steps

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   
   Edit the `.env` file:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/task-management-db
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRES_IN=7d
   CLIENT_URL=http://localhost:3000
   ```

3. **Start MongoDB:**
   ```bash
   # If using local MongoDB
   mongod
   ```

4. **Run the server:**
   ```bash
   # Production
   npm start

   # Development (with nodemon)
   npm run dev
   ```

The server will start on `http://localhost:5000`

## Project Structure

```
task-management-backend/
├── config/
│   └── database.js           # MongoDB connection
├── controllers/
│   ├── authController.js     # Authentication logic
│   └── taskController.js     # Task CRUD & Excel export
├── middleware/
│   ├── auth.js               # JWT authentication
│   └── validator.js          # Input validation
├── models/
│   ├── User.js               # User schema
│   └── Task.js               # Task schema
├── routes/
│   ├── authRoutes.js         # Auth endpoints
│   └── taskRoutes.js         # Task endpoints
├── .env                      # Environment variables
├── .gitignore                # Git ignore file
├── package.json              # Dependencies
├── server.js                 # Main server file
└── README.md                 # Documentation
```

## API Documentation

### Base URL
```
http://localhost:5000
```

---

## Authentication Endpoints

### 1. Signup

**Endpoint:** `POST /api/auth/signup`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### 2. Login

**Endpoint:** `POST /api/auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "lastLogin": "2024-01-15T10:35:00.000Z"
  }
}
```

### 3. Get Profile

**Endpoint:** `GET /api/auth/profile`

**Headers:**
```
Authorization: Bearer <your-jwt-token>
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "lastLogin": "2024-01-15T10:35:00.000Z"
  }
}
```

### 4. Verify Token

**Endpoint:** `GET /api/auth/verify`

**Headers:**
```
Authorization: Bearer <your-jwt-token>
```

### 5. Logout

**Endpoint:** `POST /api/auth/logout`

**Headers:**
```
Authorization: Bearer <your-jwt-token>
```

---

## Task Management Endpoints

### 1. Create Task

**Endpoint:** `POST /api/tasks`

**Request Body:**
```json
{
  "author": "John Doe",
  "division": "Engineering",
  "task": "Implement new feature for dashboard",
  "dateOfTask": "2024-01-20",
  "status": "pending",
  "priority": "high"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Task created successfully",
  "task": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "author": "John Doe",
    "division": "Engineering",
    "task": "Implement new feature for dashboard",
    "dateOfTask": "2024-01-20T00:00:00.000Z",
    "status": "pending",
    "priority": "high",
    "createdAt": "2024-01-15T10:40:00.000Z",
    "updatedAt": "2024-01-15T10:40:00.000Z"
  }
}
```

### 2. Get All Tasks

**Endpoint:** `GET /api/tasks`

**Query Parameters:**
- `author` - Filter by author name (partial match)
- `division` - Filter by division (partial match)
- `status` - Filter by status (pending, in-progress, completed, cancelled)
- `priority` - Filter by priority (low, medium, high, urgent)
- `startDate` - Filter tasks from this date
- `endDate` - Filter tasks until this date
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)

**Example:**
```
GET /api/tasks?division=Engineering&status=pending&page=1&limit=10
```

**Response:**
```json
{
  "success": true,
  "count": 10,
  "total": 45,
  "page": 1,
  "totalPages": 5,
  "tasks": [...]
}
```

### 3. Get Single Task

**Endpoint:** `GET /api/tasks/:id`

**Example:**
```
GET /api/tasks/65a1b2c3d4e5f6g7h8i9j0k1
```

### 4. Update Task

**Endpoint:** `PUT /api/tasks/:id`

**Headers:**
```
Authorization: Bearer <your-jwt-token>
```

**Request Body:**
```json
{
  "status": "completed",
  "priority": "medium"
}
```

### 5. Delete Task

**Endpoint:** `DELETE /api/tasks/:id`

**Headers:**
```
Authorization: Bearer <your-jwt-token>
```

### 6. Download Tasks as Excel 📊

**Endpoint:** `GET /api/tasks/download/excel`

**Query Parameters (Optional - same as Get All Tasks):**
- `author` - Filter by author
- `division` - Filter by division
- `status` - Filter by status
- `priority` - Filter by priority
- `startDate` - Filter from date
- `endDate` - Filter to date

**Example:**
```
GET /api/tasks/download/excel?division=Engineering&status=completed
```

**Response:**
- Downloads Excel file (.xlsx) with all filtered tasks
- File includes: ID, Author, Division, Task, Date, Status, Priority, Created By, Created At, Updated At
- Formatted with headers, borders, and auto-filter

**Frontend Implementation:**
```javascript
// Simple download button
const downloadExcel = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/tasks/download/excel');
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tasks_${new Date().toISOString().split('T')[0]}.xlsx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Download failed:', error);
  }
};
```

### 7. Get Task Statistics

**Endpoint:** `GET /api/tasks/stats`

**Response:**
```json
{
  "success": true,
  "stats": {
    "total": 100,
    "pending": 25,
    "inProgress": 30,
    "completed": 40,
    "cancelled": 5,
    "byDivision": [
      { "_id": "Engineering", "count": 45 },
      { "_id": "Marketing", "count": 30 },
      { "_id": "Sales", "count": 25 }
    ],
    "byPriority": [
      { "_id": "high", "count": 30 },
      { "_id": "medium", "count": 50 },
      { "_id": "low", "count": 20 }
    ]
  }
}
```

---

## Frontend Integration Examples

### JavaScript (Fetch API)

#### Signup
```javascript
const signup = async (name, email, password) => {
  const response = await fetch('http://localhost:5000/api/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  });
  const data = await response.json();
  if (data.success) {
    localStorage.setItem('token', data.token);
  }
  return data;
};
```

#### Login
```javascript
const login = async (email, password) => {
  const response = await fetch('http://localhost:5000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await response.json();
  if (data.success) {
    localStorage.setItem('token', data.token);
  }
  return data;
};
```

#### Create Task
```javascript
const createTask = async (taskData) => {
  const token = localStorage.getItem('token');
  const response = await fetch('http://localhost:5000/api/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Optional if route is public
    },
    body: JSON.stringify(taskData)
  });
  return await response.json();
};

// Usage
createTask({
  author: 'John Doe',
  division: 'Engineering',
  task: 'Build new feature',
  dateOfTask: '2024-01-20',
  status: 'pending',
  priority: 'high'
});
```

#### Get All Tasks
```javascript
const getTasks = async (filters = {}) => {
  const query = new URLSearchParams(filters).toString();
  const response = await fetch(`http://localhost:5000/api/tasks?${query}`);
  return await response.json();
};

// Usage
getTasks({ division: 'Engineering', status: 'pending', page: 1, limit: 10 });
```

#### Download Excel
```javascript
const downloadExcel = async (filters = {}) => {
  const query = new URLSearchParams(filters).toString();
  const response = await fetch(`http://localhost:5000/api/tasks/download/excel?${query}`);
  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `tasks_${new Date().toISOString().split('T')[0]}.xlsx`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
};

// Usage
downloadExcel({ division: 'Engineering' });
```

### React Example

```jsx
import React, { useState } from 'react';

function TaskForm() {
  const [formData, setFormData] = useState({
    author: '',
    division: '',
    task: '',
    dateOfTask: '',
    status: 'pending',
    priority: 'medium'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (data.success) {
        alert('Task created successfully!');
        // Reset form or redirect
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDownloadExcel = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/tasks/download/excel');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `tasks_${new Date().toISOString().split('T')[0]}.xlsx`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Author"
          value={formData.author}
          onChange={(e) => setFormData({...formData, author: e.target.value})}
          required
        />
        <input
          type="text"
          placeholder="Division"
          value={formData.division}
          onChange={(e) => setFormData({...formData, division: e.target.value})}
          required
        />
        <textarea
          placeholder="Task Description"
          value={formData.task}
          onChange={(e) => setFormData({...formData, task: e.target.value})}
          required
        />
        <input
          type="date"
          value={formData.dateOfTask}
          onChange={(e) => setFormData({...formData, dateOfTask: e.target.value})}
          required
        />
        <select
          value={formData.status}
          onChange={(e) => setFormData({...formData, status: e.target.value})}
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <select
          value={formData.priority}
          onChange={(e) => setFormData({...formData, priority: e.target.value})}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="urgent">Urgent</option>
        </select>
        <button type="submit">Create Task</button>
      </form>
      
      <button onClick={handleDownloadExcel}>
        Download Excel Report
      </button>
    </div>
  );
}

export default TaskForm;
```

---

## Testing with cURL

### Signup
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

### Create Task
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "author":"John Doe",
    "division":"Engineering",
    "task":"Build new feature",
    "dateOfTask":"2024-01-20",
    "status":"pending",
    "priority":"high"
  }'
```

### Get All Tasks
```bash
curl http://localhost:5000/api/tasks
```

### Download Excel
```bash
curl http://localhost:5000/api/tasks/download/excel -o tasks.xlsx
```

---

## Security Features

1. **Password Hashing:** Passwords are hashed using bcrypt with salt rounds
2. **JWT Authentication:** Secure token-based authentication
3. **Input Validation:** All inputs are validated and sanitized
4. **Error Handling:** Proper error messages without exposing sensitive information
5. **CORS Protection:** Configurable CORS settings
6. **Environment Variables:** Sensitive data stored in environment variables

---

## Error Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request (Validation error)
- `401` - Unauthorized (Invalid credentials or no token)
- `403` - Forbidden (Invalid/expired token)
- `404` - Not Found
- `500` - Server Error

---

## Production Deployment

### Security Checklist

1. Change `JWT_SECRET` to a strong random string
2. Use MongoDB Atlas or secure MongoDB instance
3. Enable HTTPS
4. Set `NODE_ENV=production`
5. Use environment variables for all sensitive data
6. Enable rate limiting (install `express-rate-limit`)
7. Add helmet for security headers (install `helmet`)
8. Set up proper logging

---

## License

ISC

---

## Support

For issues and questions, please open an issue in the repository.
