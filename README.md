 College Event Registration System

A full-stack web application that allows students to register for college events 
and provides admins with a complete event management portal.

> **Course:** Google Cloud Digital Leader — Capstone Project  
> **Stack:** MongoDB, Express.js, React.js, Node.js (MERN)

---

##  Features

### Students Can
- Browse upcoming events with live seat availability
- Register for events and receive a unique Registration ID
- Check their registrations anytime using their email

### Admin Can
- Login securely with JWT authentication
- Add, Edit and Delete events with custom categories
- View registrations filtered by event with search
- Export registrations to Excel (per event or all)
- View live dashboard stats

---

##  Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, Tailwind CSS, Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Auth | JWT, bcryptjs |
| Export | XLSX, File Saver |

---

##  Prerequisites

Install these before running the project:

- [Node.js](https://nodejs.org) — v18 or higher
- [MongoDB Community](https://www.mongodb.com/try/download/community) — Latest
- [Git](https://git-scm.com) — Latest

---

##  Installation & Setup

### Step 1 — Clone the Repository
```bash
git clone https://github.com/yourusername/college-event-registration.git
cd college-event-registration
```

### Step 2 — Setup Backend
```bash
cd backend
npm install
```

Create `.env` file inside backend folder:
PORT=5000
MONGO_URI=mongodb://localhost:27017/college_events
JWT_SECRET=mysupersecretkey123
ADMIN_EMAIL=admin@college.com
ADMIN_PASSWORD=admin123

### Step 3 — Setup Frontend
```bash
cd frontend
npm install
```

Create `.env` file inside frontend folder:
VITE_API_URL=http://localhost:5000/api

### Step 4 — Create Admin Account
```bash
cd backend
npm run seed
```

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

Open browser and go to:
http://localhost:5173

---

##  Admin Login
Email:    admin@college.com
Password: admin123

Go to: `http://localhost:5173/admin/login`

---

## 📡 Key API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | /api/events | Get all events |
| POST | /api/register | Register for event |
| GET | /api/register/check/:email | Check registration by email |
| POST | /api/admin/login | Admin login |
| GET | /api/admin/stats | Dashboard stats |
| POST | /api/admin/events | Create event |
| PUT | /api/admin/events/:id | Update event |
| DELETE | /api/admin/events/:id | Delete event |
| GET | /api/admin/registrations | All registrations |

---

##  GCP Cloud Architecture

This local prototype is designed to migrate to Google Cloud Platform:

| Local | Google Cloud Service | Why |
|---|---|---|
| React Frontend | Firebase Hosting | Serverless, global CDN |
| Node/Express Backend | Cloud Run | Auto scaling, serverless containers |
| MongoDB Local | Firestore | Serverless NoSQL database |
| Manual Deploy | Cloud Build | CI/CD from GitHub |
| Direct API Calls | Cloud Pub/Sub | Loose coupling for future services |

---

##  Common Issues

**Port 5000 already in use:**
```bash
netstat -ano | findstr :5000
taskkill /PID <NUMBER> /F
```

**MongoDB not connecting:**
- Open MongoDB Compass
- Connect to `mongodb://localhost:27017`
- Make sure MongoDB service is running

---

# License
Built for educational purposes as part of the 
Google Cloud Digital Leader Capstone Project.
