# 🧩 Multiuser Task Manager – MERN Stack

A full-stack **Task Management Web Application** built with the **MERN stack** (MongoDB, Express.js, React, Node.js) featuring **multi-user authentication**, **task CRUD operations**, and **role-based access control** using **JWT** and **Redux** for state management.

---

## 🚀 Features

### 🔐 Authentication & Authorization

- Secure **JWT-based authentication** (Register / Login / Logout).
- **Role-based access control** (Admin, User).
- **Protected routes** with token verification.

### 🗂️ Task Management

- Create, update, delete, and view tasks.
- Assign tasks to specific users.
- Task filtering by **status**, **priority**, and **assignee**.
- Real-time status updates with Redux.

### 👥 Multiuser System

- Admin can manage users (view, update, delete).
- Each user can manage their own tasks.
- Separate dashboards for Admins and Users.

### ⚙️ Other Features

- **Redux Toolkit** for global state management.
- **RESTful API** with Express.js.
- **Responsive UI** using modern React hooks.
- **Mongoose ODM** for MongoDB operations.
- **Error handling** and input validation with middleware.

---

## 🏗️ Tech Stack

| Layer               | Technology                                                |
| ------------------- | --------------------------------------------------------- |
| **Frontend**        | React.js, Redux Toolkit, Axios, TailwindCSS / Material UI |
| **Backend**         | Node.js, Express.js                                       |
| **Database**        | MongoDB (Mongoose)                                        |
| **Authentication**  | JSON Web Tokens (JWT)                                     |
| **Version Control** | Git & GitHub                                              |

---

## 📁 Folder Structure

```
mern-taskmanager/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── app/ (Redux store)
│   │   ├── components/
│   │   ├── features/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   └── package.json
│
├── .env
├── package.json
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/mern-taskmanager.git
cd mern-taskmanager
```

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside `/backend` with the following variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

Start the backend server:

```bash
npm run dev
```

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The app will be available at **[http://localhost:5173/](http://localhost:5173/)** (if using Vite).

---

## 🔑 API Endpoints (Sample)

| Method | Endpoint             | Description           | Auth       |
| ------ | -------------------- | --------------------- | ---------- |
| POST   | `/api/auth/register` | Register a new user   | Public     |
| POST   | `/api/auth/login`    | Login user            | Public     |
| GET    | `/api/tasks`         | Get all tasks (admin) | Admin      |
| POST   | `/api/tasks`         | Create new task       | User/Admin |
| PUT    | `/api/tasks/:id`     | Update task           | User/Admin |
| DELETE | `/api/tasks/:id`     | Delete task           | Admin      |

---

## 🧠 Redux State Flow

1. **User actions** (login/register/task CRUD) trigger **Redux Toolkit slices**.
2. **Async Thunks** handle API calls via Axios.
3. Responses update the **Redux Store**, re-rendering components automatically.

---

## 🧪 Scripts

| Command          | Description                           |
| ---------------- | ------------------------------------- |
| `npm run dev`    | Start backend with nodemon            |
| `npm start`      | Run production build                  |
| `npm run client` | Run frontend only                     |
| `npm run server` | Run backend only                      |
| `npm run both`   | Concurrently run frontend and backend |

---

## 🧰 Version Control & Workflow

- **Git + GitHub** for version management.
- **Agile methodology** with feature-based branching:

  - `feat/*` → new features
  - `fix/*` → bug fixes
  - `refactor/*` → improvements

- Pull requests with code review before merge.

---

## 🧑‍💻 Future Improvements

- ✅ Task comments & activity logs
- ✅ File attachments in tasks
- ✅ Notification system (email/push)
- ✅ Team collaboration features

---

## 📄 License

This project is licensed under the **MIT License**.
Feel free to use, modify, and distribute with attribution.

---

## 🌐 Live Demo & Repository

🔗 **Live Demo:** [https://taskmanager-mern.vercel.app](#)
💻 **Repository:** [https://github.com/your-username/mern-taskmanager](#)

---

Would you like me to **personalize this README** (e.g. use

Here’s a **clean, concise, and professional summary README** version — including **Agile workflow** and **Version Control** sections:

---

# 🧩 Multiuser Task Manager – MERN Stack

A full-stack **Task Management Application** built with the **MERN stack (MongoDB, Express.js, React, Node.js)** featuring **multiuser authentication**, **task CRUD operations**, and **role-based access control**.

---

## 🚀 Key Features

- 🔐 **JWT Authentication & Authorization** – Secure login/register with protected routes.
- 👥 **Multiuser Roles** – Admin and User dashboards with permission control.
- 🗂️ **Task Management** – Create, update, delete, and assign tasks.
- ⚡ **Redux Toolkit** – Centralized state management for seamless UI updates.
- 🧱 **RESTful API** – Clean backend with Express.js & Mongoose.
- 🧩 **Responsive UI** – Modern React hooks and design system.

---

## 🏗️ Tech Stack

| Layer           | Technology                  |
| --------------- | --------------------------- |
| Frontend        | React, Redux Toolkit, Axios |
| Backend         | Node.js, Express.js         |
| Database        | MongoDB (Mongoose)          |
| Auth            | JWT                         |
| Styling         | TailwindCSS / Material UI   |
| Version Control | Git & GitHub                |

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repo

```bash
git clone https://github.com/your-username/mern-taskmanager.git
cd mern-taskmanager
```

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
NODE_ENV=development
```

Run server:

```bash
npm run dev
```

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🧠 Project Workflow

- Uses **Agile methodology** with short sprints and iterative development.
- **Version Control** via Git & GitHub using professional branching strategy:

  - `feat/*` → new feature
  - `fix/*` → bug fix
  - `refactor/*` → improvement
  - `docs/*` → documentation

---

## 📂 Folder Structure

```
mern-taskmanager/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── app/ (Redux store)
│   │   ├── features/
│   │   ├── pages/
│   │   ├── components/
│   │   └── App.jsx
│
└── README.md
```

---

## 🧪 Scripts

| Command          | Description                         |
| ---------------- | ----------------------------------- |
| `npm run dev`    | Run backend with nodemon            |
| `npm start`      | Production build                    |
| `npm run client` | Run frontend only                   |
| `npm run both`   | Run frontend & backend concurrently |

---

## 🌱 Future Enhancements

- Notifications & comments
- File attachments in tasks
- Analytics dashboard
- Real-time collaboration

---

## 📄 License

Licensed under the **MIT License** – free to use and modify.
