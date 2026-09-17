# Personal Portfolio — Full-Stack CMS

## Overview

Dynamic personal portfolio with a full admin dashboard. All content (hero, about,
skills, education, experience, projects, achievements, certificates, publications,
resume, social links) is managed from `/admin` — no code changes needed to update content.

## Tech Stack

- Frontend: React, Vite, Tailwind CSS, Framer Motion, React Router, TipTap, Swiper, dnd-kit
- Backend: Node.js, Express, MongoDB, Mongoose, JWT, Cloudinary
- Deployment: Vercel (frontend), Render (backend), MongoDB Atlas (DB)

## Folder Structure

See `/backend/src` and `/frontend/src` — organized by feature (controllers/routes/models
on backend, components/pages/services on frontend).

## Environment Variables

Copy `.env.example` to `.env` in both `backend/` and `frontend/` and fill in values.

## Local Development

Backend:
\`\`\`bash
cd backend
npm install
npm run seed:admin # creates admin user from env vars
npm run seed # populates sample data
npm run dev
\`\`\`

Frontend:
\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`

## MongoDB Setup

1. Create a free cluster on MongoDB Atlas
2. Get the connection string, add to `backend/.env` as `MONGODB_URI`
3. Whitelist your IP (or 0.0.0.0/0 for development)

## Cloudinary Setup

1. Create a free Cloudinary account
2. Copy cloud name, API key, API secret into `backend/.env`

## Admin Setup

Set `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `backend/.env`, then run `npm run seed:admin`.

## API Documentation

Visit `http://localhost:5000/api-docs` once the backend is running.

## Deployment

- **Frontend (Vercel):** connect repo, set root to `frontend/`, add `VITE_API_URL` env var pointing to your deployed backend
- **Backend (Render):** connect repo, set root to `backend/`, add all backend env vars, set start command to `npm start`
- **Database:** MongoDB Atlas connection string in `MONGODB_URI`

## Security Notes

- JWT stored in httpOnly cookies
- Rate limiting on auth and contact endpoints
- Rich text sanitized server-side before storage
- Helmet + CORS configured for production origins only
