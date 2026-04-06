#  College Event Registration System

> **Course:** Google Cloud Digital Leader — Capstone Project
> **Stack:** MongoDB • Express.js • React.js • Node.js (MERN)

---

##  Overview

A full-stack web application where students can register for college events
like Tech Fest, Cultural Night and Workshops. Admins can manage events
and view all registrations through a secure portal.

---

##  Project Architecture
┌─────────────────────────────────────────────────────┐
│                   BROWSER                           │
└──────────────────────┬──────────────────────────────┘
│
┌──────────────────────▼──────────────────────────────┐
│              REACT FRONTEND                         │
│         Tailwind CSS • React Router                 │
│                                                     │
│  Public Pages          Admin Pages                  │
│  ├── Home              ├── Login                    │
│  ├── Register          ├── Dashboard                │
│  ├── Success           ├── Events (CRUD)            │
│  └── Check Reg         └── Registrations            │
└──────────────────────┬──────────────────────────────┘
│ Axios HTTP Requests
┌──────────────────────▼──────────────────────────────┐
│           NODE.JS + EXPRESS BACKEND                 │
│                                                     │
│  Public Routes         Protected Routes (JWT)       │
│  ├── GET /events       ├── POST /admin/events       │
│  ├── POST /register    ├── PUT  /admin/events/:id   │
│  └── GET /check/:email ├── DELETE /admin/events/:id │
│                        ├── GET /admin/registrations  │
│                        └── GET /admin/stats          │
│                                                     │
│  Middleware: JWT Auth • CORS • bcryptjs             │
└──────────────────────┬──────────────────────────────┘
│ Mongoose ODM
┌──────────────────────▼──────────────────────────────┐
│                  MONGODB                            │
│                                                     │
│  events          registrations       admins         │
│  ├── name        ├── registrationId  ├── email      │
│  ├── description ├── fullName        └── password   │
│  ├── date        ├── email               (hashed)   │
│  ├── venue       ├── phone                          │
│  ├── category    ├── department                     │
│  ├── capacity    ├── yearOfStudy                    │
│  └── seatsLeft   └── eventName                      │
└─────────────────────────────────────────────────────┘

---

##  Features

### Students (No Login Required)
- Browse events with live seat availability
- Register and receive a unique Registration ID
- Check registrations anytime using email

### Admin (Secure Login)
- Add, Edit and Delete events
- View live dashboard stats
- View registrations filtered by event tabs
- Export registrations to Excel

---

##  Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, Tailwind CSS, Axios, React Router |
| Backend | Node.js, Express.js, JWT, bcryptjs |
| Database | MongoDB, Mongoose |
| Export | XLSX, File Saver |

---

##  Prerequisites

- [Node.js v18+](https://nodejs.org)
- [MongoDB Community](https://www.mongodb.com/try/download/community)
- [Git](https://git-scm.com)

---

##  Setup & Installation

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/college-event-registration.git
cd college-event-registration
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create `backend/.env`:
PORT=5000
MONGO_URI=mongodb://localhost:27017/college_events
JWT_SECRET=mysupersecretkey123
ADMIN_EMAIL=admin@college.com
ADMIN_PASSWORD=admin123

### 3. Frontend Setup
```bash
cd frontend
npm install
```

Create `frontend/.env`:
VITE_API_URL=http://localhost:5000/api

### 4. Create Default Admin Account
```bash
cd backend
npm run seed
```

Expected output:
✅ MongoDB Connected
✅ Admin created successfully!
📧 Email: admin@college.com
🔑 Password: admin123

---

##  Running the Application

Open two terminals and run both together:

**Terminal 1 — Backend**
```bash
cd backend
npm run dev
```

**Terminal 2 — Frontend**
```bash
cd frontend
npm run dev
```

Open browser: `http://localhost:5173`

---

##  Admin Login
URL:      http://localhost:5173/admin/login
Email:    admin@college.com
Password: admin123

---

##  Pages

| Page | URL |
|---|---|
| Home | http://localhost:5173 |
| Register | http://localhost:5173/register |
| Check Registration | http://localhost:5173/check-registration |
| Admin Login | http://localhost:5173/admin/login |
| Admin Dashboard | http://localhost:5173/admin/dashboard |
| Manage Events | http://localhost:5173/admin/events |
| All Registrations | http://localhost:5173/admin/registrations |

---

##  API Endpoints

### Public
| Method | Endpoint | Description |
|---|---|---|
| GET | /api/events | Get all events |
| POST | /api/register | Register for event |
| GET | /api/register/check/:email | Check by email |

### Admin (JWT Required)
| Method | Endpoint | Description |
|---|---|---|
| POST | /api/admin/login | Admin login |
| GET | /api/admin/stats | Dashboard stats |
| POST | /api/admin/events | Create event |
| PUT | /api/admin/events/:id | Update event |
| DELETE | /api/admin/events/:id | Delete event |
| GET | /api/admin/registrations | All registrations |
