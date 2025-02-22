# Task Management Application

A full-stack Task Management Application with drag-and-drop functionality, real-time updates, and Firebase authentication.

## 🚀 Live Demo
 
 - live link: https://job-task-client2.web.app/

## 📂 Features
- User Authentication (Firebase - Google Sign-In)
- Task Management (Add, Edit, Delete, Drag & Drop Tasks)
- Real-time Updates using WebSockets (MongoDB Change Streams)
- Task Categorization (To-Do, In Progress, Done)
- Responsive UI with Tailwind CSS

---

## 🛠️ Technologies Used
### **Frontend:**
- React.js (Vite)
- Tailwind CSS & Daisy UI
- Firebase Authentication
- socket.io client
- React DnD (@hello-pangea/dnd)

### **Backend:**
- Node.js & Express.js
- MongoDB (No Mongoose, using Native Driver)
- WebSockets (Socket.io / Change Streams)
- Render (for deploy)

---

## ⚙️ Installation Steps

### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/your-username/task-manager.git
cd task-manager
```

### **2️⃣ Setup Client**
```bash
cd client
npm install
```

Create a `.env` file inside `client/` and add:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
```

Run the client:
```bash
npm run dev
```

### **3️⃣ Setup Server**
```bash
cd ../server
npm install
```

Create a `.env` file inside `server/` and add:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run the server:
```bash
npm start
```

---

## 📦 Dependencies

### **Frontend Dependencies:**
- react
- react-router
- tailwindcss
- @hello-pangea/dnd
- socket.io client

### **Backend Dependencies:**
- express
- cors
- dotenv
- mongodb
- socket.io



# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
