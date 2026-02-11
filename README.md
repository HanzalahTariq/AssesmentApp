# Assessment & Feedback Web App

This is a modern web application for collecting Assessments and Feedback, built with React + Vite (Frontend) and Node.js + MySQL (Backend).

## Features
- **Public Assessment Form**: Collects user info, 10 MCQs, and 10 True/False questions.
- **Public Feedback Form**: Likert scale feedback form with text suggestions.
- **Admin Dashboard**: View and download Assessment data as CSV.
- **Admin Feedback**: View and download Feedback data as CSV.
- **Responsive Design**: Works on desktop and mobile.
- **Modern UI**: Dark mode glassmorphism design.

## Prerequisites
- Node.js installed.
- MySQL Server running.
- Create a MySQL database (e.g. `assessment_app` - though the app will try to create tables, the DB must exist).
  - You can change DB name in `server/.env`.
  - Update `DB_PASS` in `server/.env` if you have a password for root.

## Setup & Run

### 1. Backend (Server)
```bash
cd server
npm install
# Configure .env if needed
npm run dev
```
Server runs on http://localhost:5000

### 2. Frontend (Client)
```bash
cd client
npm install
npm run dev
```
Client runs on http://localhost:5173 (usually)

## API Endpoints
- `POST /api/assessments` - Submit assessment
- `GET /api/assessments` - Get all assessments
- `POST /api/feedback` - Submit feedback
- `GET /api/feedback` - Get all feedback
