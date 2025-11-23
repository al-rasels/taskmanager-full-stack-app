# 🧩 TaskManager – Full Stack Multi-User Task Management App

A **MERN stack** project built using **Node.js, Express, MongoDB**, and **Vite + React**.
This app allows multiple users to **create, update, and manage tasks** with real-time progress tracking and secure authentication.

---

## ⚙️ Tech Stack

**Frontend:** React (Vite), Redux, Axios, Bootstrap, React-Bootstrap, Recharts, SweetAlert2
**Backend:** Node.js, Express.js, MongoDB, Mongoose
**Security:** Helmet, CORS, Rate Limiter, Mongo Sanitize, XSS-Clean, HPP
**Auth:** JWT Authentication

---

## 🧠 Key Features

- 🔐 User registration and authentication (JWT-based)
- 🧾 CRUD operations for tasks
- 📊 Dashboard with charts (Recharts)
- ⚡ Responsive UI (Bootstrap + React-Bootstrap)
- 🔔 Notifications (SweetAlert2 & Cogo-Toast)
- 🧩 Secure REST API integration with Axios

---

## 📂 Project Structure

```
taskmanager-full-stack-app/
│
├── server/           # Express backend (API & DB)
│   ├── src/
│   ├── index.js
│   └── package.json
│
├── client/           # Vite React frontend (UI)
│   ├── src/
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

---

## 🧰 Installation

### 1️⃣ Clone Repository

```bash
git clone https://github.com/al-rasels/taskmanager-full-stack-app.git
cd taskmanager-full-stack-app
```

### 2️⃣ Setup Backend

```bash
cd server
npm install
```

Create `.env` in `/server`:

```env
PORT=5000
MONGO_URI=mongodb+srv://<your-db-url>
JWT_SECRET=your_jwt_secret
```

Start backend:

```bash
npm start
```

### 3️⃣ Setup Frontend

```bash
cd ../client
npm install
npm run dev
```

-

## 🧾 License

Licensed under the **MIT License**.
© 2025 **Md Humaun Al Rasel**

---

## 👨‍💻 Author

**Md Humaun Al Rasel**
🔗 GitHub: [al-rasels](https://github.com/al-rasels)
🐞 Issues: [Report Bug](https://github.com/al-rasels/taskmanager-full-stack-app/issues)
