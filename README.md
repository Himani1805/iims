# HS Academic Portal (IIMS)

Personal campus academic admin portal. Institutions can manage timetable, attendance, study material, tickets, and other academic/admin modules from one dashboard.

Built as a full-stack app: React frontend + Express API + MongoDB (Atlas or local).

## Tech stack

| Layer | Stack |
|---|---|
| Frontend | React 18, Vite, Chakra UI, React Router, Axios |
| Backend | Node.js, Express, JWT, bcrypt, express-validator, rate-limit |
| Database | MongoDB / MongoDB Atlas |
| Auth | Signup, Login, role-based admin protection |

## Project structure

```text
iims/
  frontend/     Vite React app (UI + protected admin routes)
  backend/      Express API + Mongo models + seed scripts
  render.yaml   Backend deploy blueprint (Render)
  README.md
```

## Features

- Login / Signup with JWT
- First registered user becomes admin
- Admin-only dashboard (ProtectedRoute + backend `adminOnly`)
- Stronger password rules (8+ chars, letter + number)
- Users & Roles admin UI (promote / demote)
- Master data in Mongo (Institution, School, Programme, …) with admin CRUD
- 47 academic/admin modules with per-module CRUD
- Records pagination + search
- Request validation + API rate limiting
- Tile badges show saved record count from MongoDB
- Seed scripts for admin, demo records, and master data

## Setup

### 1) Backend

```bash
cd backend
npm install
cp .env.example .env
```

Edit `backend/.env`:

```env
PORT=5050
MONGO_URI=mongodb+srv://USER:PASS@cluster0.xxxxx.mongodb.net/hs_academic_portal?retryWrites=true&w=majority
JWT_SECRET=your_long_random_secret
CLIENT_URL=http://127.0.0.1:5173
```

Seed admin + master data + demo records:

```bash
npm run seed
npm run seed:master
npm run seed:data
```

Start API:

```bash
npm run dev
```

API runs at `http://127.0.0.1:5050`

### 2) Frontend

```bash
cd frontend
npm install
```

Optional `frontend/.env`:

```env
VITE_API_URL=http://127.0.0.1:5050/api
```

```bash
npm run dev
```

App runs at `http://127.0.0.1:5173`

### Default admin

- Email: `himani@hsacademic.com`
- Password: `admin123`

## API overview

### Auth

| Method | Endpoint | Access |
|---|---|---|
| POST | `/api/auth/signup` | Public (rate-limited) |
| POST | `/api/auth/login` | Public (rate-limited) |
| GET | `/api/auth/me` | Logged in |
| GET | `/api/auth/users` | Admin |
| PATCH | `/api/auth/users/:id/role` | Admin |

### Master data

| Method | Endpoint | Access |
|---|---|---|
| GET | `/api/master-data` | Logged in |
| POST | `/api/master-data` | Admin |
| PUT | `/api/master-data/:id` | Admin |
| DELETE | `/api/master-data/:id` | Admin (soft deactivate) |

### Records

| Method | Endpoint | Access |
|---|---|---|
| GET | `/api/records` | Admin (summary + counts) |
| GET | `/api/records/:moduleKey?page=&limit=&q=` | Admin |
| POST | `/api/records/:moduleKey` | Admin |
| PUT | `/api/records/:moduleKey/:id` | Admin |
| DELETE | `/api/records/:moduleKey/:id` | Admin |

## Deploy

### Frontend (Vercel)

- `frontend/vercel.json` already has SPA rewrites
- Set `VITE_API_URL` to your hosted API base, e.g. `https://hs-academic-api.onrender.com/api`
- Root directory: `frontend`

### Backend (Render / Railway / Fly)

- Use root `render.yaml`, or point host at `backend/` with `npm start`
- Set `MONGO_URI`, `JWT_SECRET`, `CLIENT_URL` (your Vercel URL)

## Scripts

Backend:

```bash
npm run dev          # start API with watch
npm run seed         # create/update admin user
npm run seed:master  # upsert master dropdown data
npm run seed:data    # seed demo records for all modules
npm run test:api     # smoke test (API must be running)
```

Frontend:

```bash
npm run dev
npm run build
```

## Notes

- Do not commit `backend/.env`
- Keep secrets only in local env / host dashboard
- Port `5050` is used for backend to avoid conflict with other local apps on `5000`
- Legacy unused page stubs under `frontend/src/Pages/admin/*` are superseded by `ModuleWorkspace`
