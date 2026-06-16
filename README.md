# FitMentor AI SaaS

FitMentor AI is a comprehensive, AI-powered personal fitness coaching platform.

## Features
- **AI Workout & Diet Plans**: Generated using the Google Gemini API based on user profiles.
- **AI Coach**: A chatbot to guide users on their fitness journey.
- **Progress Tracking**: Recharts-based data visualization for weight, calories, and body fat.
- **Gamification**: Streaks, Achievements, and Fitness Scores.
- **PDF Export**: Generate PDF reports of your progress on the fly.
- **Modern UI**: Built with React, Vite, Tailwind CSS, Framer Motion, and Glassmorphism design principles.

## Tech Stack
- Frontend: React (Vite), Tailwind CSS, Framer Motion, Recharts, Axios, React Router.
- Backend: Node.js, Express, MongoDB, Mongoose, JWT.
- AI: Google Generative AI (Gemini 1.5 Flash).

## Setup Instructions

### Prerequisites
- Node.js installed
- MongoDB installed or Atlas URI
- Gemini API Key

### Backend
1. `cd backend`
2. `npm install`
3. Add your `MONGO_URI`, `JWT_SECRET`, and `GEMINI_API_KEY` to `backend/.env`.
4. `npm run dev`

### Frontend
1. `cd frontend`
2. `npm install`
3. `npm run dev`

Your AI Fitness Coach is ready to go!
