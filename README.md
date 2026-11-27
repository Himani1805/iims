# HS Academic Portal (IIMS)

Personal campus academic admin portal. Institutions can manage timetable, attendance, study material, tickets, and other academic/admin modules from one dashboard.

Built as a full-stack app: React frontend + Express API + MongoDB (Atlas or local).

## Tech stack

| Layer | Stack |
|---|---|
| Frontend | React 18, Vite, Chakra UI, React Router, Axios |
| Backend | Node.js, Express, JWT, bcrypt |
| Database | MongoDB / MongoDB Atlas |
| Auth | Signup, Login, role-based admin protection |

## Project structure

```text
iims/
  frontend/     Vite React app (UI + protected admin routes)
  backend/      Express API + Mongo models + seed scripts
  README.md
```

## Features

- Login / Signup with JWT
- First registered user becomes admin
- Admin-only dashboard (ProtectedRoute + backend `adminOnly`)
- 47 academic/admin modules
- Per-module CRUD (create, list, edit, delete)
- Tile badges show saved record count from MongoDB
- Seed scripts for admin user and demo data

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

Seed admin + demo records:

```bash
npm run seed
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
| POST | `/api/auth/signup` | Public |
| POST | `/api/auth/login` | Public |
| GET | `/api/auth/me` | Logged in |
| GET | `/api/auth/users` | Admin |

### Records

| Method | Endpoint | Access |
|---|---|---|
| GET | `/api/records` | Admin (summary + counts) |
| GET | `/api/records/:moduleKey` | Admin |
| POST | `/api/records/:moduleKey` | Admin |
| PUT | `/api/records/:moduleKey/:id` | Admin |
| DELETE | `/api/records/:moduleKey/:id` | Admin |

## What is done

- Frontend/backend split
- MongoDB persistence (Atlas supported)
- Auth + admin route protection
- Working module forms with saved lists
- Demo seed data for all modules

## Gaps / next improvements (senior review)

1. **Production deploy**
   - Frontend needs SPA `vercel.json` rewrites
   - Backend should be hosted separately (Render/Railway/Fly), not only local port `5050`
   - Production `CLIENT_URL` + `VITE_API_URL` env wiring required

2. **Domain model**
   - Master data (Institution/School/Programme) is still static frontend JS
   - Should move to Mongo collections + admin CRUD APIs

3. **Module UX**
   - Most modules share one generic form
   - Domain-specific screens (calendar view, attendance grid, reports charts) are still pending

4. **API quality**
   - Add pagination, search, and filters on records
   - Add request validation (Joi/Zod) and stronger error contracts
   - Add rate limiting and refresh-token flow

5. **Admin operations**
   - Users list API exists, but no UI to promote/demote roles
   - No audit log UI for create/update/delete actions

6. **Security / QA**
   - Email verification and stronger password rules missing
   - No automated tests (API + UI)
   - Old unused stub pages still exist under `frontend/src/Pages`

7. **Product polish**
   - Tile number is record count, not unread notifications
   - Better empty states, loading skeletons, and mobile layout polish

## Scripts

Backend:

```bash
npm run dev        # start API with watch
npm run seed       # create/update admin user
npm run seed:data  # seed demo records for all modules
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
