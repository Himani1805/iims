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
cd backend
npm install

cd ../frontend
npm install
```

3. Create `backend/.env` from `backend/.env.example`.
4. Seed admin user:

```bash
cd backend
npm run seed
```

Admin login:

- Email: `himani@hsacademic.com`
- Password: `admin123`

5. Start backend:

```bash
cd backend
npm run dev
```

6. Start frontend (new terminal):

```bash
cd frontend
npm run dev
```

Open http://127.0.0.1:5173/

## Auth

- Signup / Login pages included
- First registered account becomes admin
- Admin dashboard is protected (JWT + admin role)
- Module data is saved in MongoDB
