# HS Academic Portal

Personal academic admin portal with React frontend and Express + MongoDB backend.

## Structure

```text
frontend/   React + Vite + Chakra UI
backend/    Express API + MongoDB + JWT auth
```

## Setup

1. Install MongoDB locally (or set Atlas URI in `backend/.env`).
2. Install dependencies:

```bash
npm run install:all
```

3. Create `backend/.env` from `backend/.env.example`.
4. Seed admin user:

```bash
npm run seed
```

Admin login:

- Email: `himani@hsacademic.com`
- Password: `admin123`

5. Start backend:

```bash
npm run dev:backend
```

6. Start frontend (new terminal):

```bash
npm run dev:frontend
```

Open http://127.0.0.1:5173/

## Auth

- Signup / Login pages included
- First registered account becomes admin
- Admin dashboard is protected (JWT + admin role)
- Module data is saved in MongoDB
