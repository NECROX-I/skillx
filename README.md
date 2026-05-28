# SkillX — Peer-to-Peer Skill Exchange Platform

Teach what you know. Learn what you love. A credit-based skill exchange where every session you teach earns 1 credit to spend on learning.

## Stack

**Backend** — Node.js · Express · MongoDB · Socket.IO · JWT  
**Frontend** — React · Vite · TailwindCSS · Zustand

## Features

- 🔐 Email/OTP auth + Google & GitHub OAuth
- 🤝 Skill-based matchmaking (ranked by shared skills & rating)
- 📅 Session booking → accept → set meeting link → confirm
- 💬 Real-time chat with message delete and conversation delete
- 🪙 Credit wallet — hold on booking, refund on cancel, settle on complete
- ⭐ Ratings & reviews after sessions
- 📋 Public skill request board
- 🌙 Dark / light mode
- 🔔 In-app notifications (session events, messages)

## DevOps & Deployment

- **Frontend** — Vercel (auto-deploy on push to main)
- **Backend** — Render (triggered via GitHub Actions CI/CD pipeline)
- **Containerized** — Docker + Nginx for local development
- **Monitoring** — Live health checks via uptime monitor
- **Secrets** — Managed via GitHub Actions secrets, documented in `.env.example`

## Quick Start

```bash
# Backend
cd backend && npm install
cp .env.example .env   # fill in values
npm run seed           # seeds 338 skills
npm run dev            # http://localhost:5000

# Frontend
cd frontend && npm install
cp .env.example .env   # set VITE_API_URL and VITE_SOCKET_URL
npm run dev            # http://localhost:5173
```

## Local Docker Setup

```bash
docker compose up --build
```

Frontend → http://localhost  
Backend → http://localhost/api

## Environment Variables

See `backend/.env.example` and `frontend/.env.example` for full list.

Required backend vars: