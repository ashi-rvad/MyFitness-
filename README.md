# 🏋️‍♂️ FitMentor - AI-Powered Fitness SaaS

![FitMentor](https://img.shields.io/badge/Status-Active-brightgreen) ![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB) ![Express.js](https://img.shields.io/badge/Express.js-404D59?style=flat) ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)

FitMentor is a premium, AI-driven fitness coaching platform designed to provide users with personalized workout routines, diet plans, and instant fitness advice. 

---

## ✨ Features

- 🤖 **AI Fitness Coach:** Chat instantly with an intelligent coach for real-time fitness advice, training techniques, and motivation.
- 🥗 **Smart Diet Planner:** Generate highly structured, macro-calculated daily meal plans tailored to your specific weight, goals, and activity levels.
- 🏃‍♂️ **Adaptive Workout Generator:** Create fully custom weekly workout routines that focus on progressive overload and your specific fitness goals.
- 🔐 **Secure Authentication:** Full JWT-based user authentication and encrypted passwords.
- 🎨 **Premium UI/UX:** Built with React and TailwindCSS featuring a beautiful, sleek dark-mode aesthetic with interactive hover states.

---

## 🏗️ Architecture & Tech Stack

This project is built as a **MERN stack** application with an AI integration layer.

### Frontend (`/frontend`)
- **Framework:** React + Vite
- **Styling:** TailwindCSS
- **Routing:** React Router DOM
- **State Management:** Context API (AuthContext)

### Backend (`/backend`)
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose)
- **AI Integration:** Google Generative AI (Gemini 1.5 Flash / Smart Context Mocks)
- **Security:** Helmet, Express Rate Limit, bcryptjs, jsonwebtoken

---

## 🚀 Local Development Setup

Follow these steps to run FitMentor on your local machine.

### 1. Clone the repository
```bash
git clone https://github.com/ashi-rvad/MyFitness-.git
cd MyFitness-
```

### 2. Setup the Backend
Open a terminal and navigate to the backend folder:
```bash
cd backend
npm install
```
Create a `.env` file inside the `backend` folder and add your secrets:
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/fitmentor
JWT_SECRET=your_super_secret_jwt_key
GEMINI_API_KEY=your_google_gemini_api_key
```
Start the backend server:
```bash
npm run dev
```

### 3. Setup the Frontend
Open a new terminal and navigate to the frontend folder:
```bash
cd frontend
npm install
```
Start the Vite development server:
```bash
npm run dev
```

The application will now be running at `http://localhost:5173`!

---

## ☁️ Deployment

FitMentor is live and deployed in the cloud!

- **Frontend App:** Hosted on Vercel at [https://my-fitness-rosy.vercel.app](https://my-fitness-rosy.vercel.app)
- **Backend API:** Hosted on Render at [https://myfitness-7d93.onrender.com](https://myfitness-7d93.onrender.com)

*(If you clone this project, simply change the `VITE_API_URL` environment variable in Vercel to point to your deployed backend!)*

---

## 🛡️ License

This project is licensed under the MIT License. Feel free to use it, modify it, and deploy it as your own!
