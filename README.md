# Sideline

Youth soccer club video management web application

## ✅ Quick start (backend + frontend)

### 1) Backend setup

Create a root env file in the repo root named `.env`.
Fill in your Mongo connection string and JWT secret.

Required keys:

- `MONGO_URI`
- `JWT_SECRET`
- `PORT` (optional, defaults to `5000`)

Install and run the backend:

```bash
cd backend
npm install
npm run dev
```

### 2) Frontend setup

If you want to override the API URL, set `REACT_APP_API_URL` in the root `.env` file.

Install and run the frontend:

```bash
cd frontend
npm install
npm start
```

By default, the frontend expects the backend at `http://localhost:5000/api`.

## ✅ Notes & troubleshooting

- If the backend fails with a Mongo error, verify `MONGO_URI` in `backend/.env`.
- If the frontend can’t reach the API, verify `REACT_APP_API_URL` in `frontend/.env`.
- Keep `.env` files out of git. Use `.env.example` for sharing config.
