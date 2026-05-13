# TextAlchemy Backend

Express API for TextAlchemy with JWT authentication, MongoDB persistence, protected text processing routes, history, and analytics.

## Setup

```bash
cd server
npm install
cp .env.example .env
npm run dev
```

## Environment

```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/textalchemy
JWT_SECRET=replace_this_with_a_long_random_secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=120
OPENAI_API_KEY=
```

## API

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/profile`
- `POST /api/text/summarize`
- `POST /api/text/humanize`
- `POST /api/text/rewrite`
- `POST /api/text/grammar`
- `GET /api/history`
- `POST /api/history`
- `DELETE /api/history/:id`
- `GET /api/history/analytics`

All text and history routes require `Authorization: Bearer <token>`.

## Dummy Data

```bash
npm run seed
```

Demo account:

- Email: `demo@textalchemy.dev`
- Password: `password123`
