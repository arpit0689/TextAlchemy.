# TextAlchemy

TextAlchemy is a full-stack MERN AI text processing web application with JWT authentication, MongoDB history, responsive dark glassmorphism UI, analytics, copy/download actions, and placeholder AI utilities that are ready to swap for OpenAI later.

## Folder Structure

```txt
textalchemy/
  client/                 React + Vite frontend
    src/
      components/         Reusable UI components
      context/            Auth/session state
      hooks/              Shared React hooks
      layouts/            Protected dashboard shell
      pages/              Login, Register, Dashboard, Result, History, Profile, Analytics, 404
      services/           Axios API clients
      styles/             Tailwind entry CSS
      utils/              Browser utilities
  server/                 Express + MongoDB backend
    src/
      config/             MongoDB connection
      controllers/        API request handlers
      middleware/         JWT and error middleware
      models/             User and History schemas
      routes/             REST route definitions
      utils/              Token, validation, AI placeholders, seeding
  sample-data.json        Example dummy data
```

## Backend Setup

```bash
cd textalchemy/server
npm install
copy .env.example .env
npm run dev
```

The backend runs at `http://localhost:5000`.

### Backend `.env`

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

## Frontend Setup

```bash
cd textalchemy/client
npm install
copy .env.example .env
npm run dev
```

The frontend runs at `http://localhost:5173`.

### Frontend `.env`

```env
VITE_API_URL=http://localhost:5000/api
```

## MongoDB Setup

Use a local MongoDB service or MongoDB Atlas.

Local URI:

```env
MONGO_URI=mongodb://127.0.0.1:27017/textalchemy
```

Atlas URI:

```env
MONGO_URI=mongodb+srv://USER:PASSWORD@cluster.mongodb.net/textalchemy
```

To load demo data:

```bash
cd textalchemy/server
npm run seed
```

Demo login:

- Email: `demo@textalchemy.dev`
- Password: `password123`

## API Routes

Auth:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/profile`

Text:

- `POST /api/text/summarize`
- `POST /api/text/humanize`
- `POST /api/text/rewrite`
- `POST /api/text/grammar`

History:

- `GET /api/history`
- `POST /api/history`
- `DELETE /api/history/:id`
- `GET /api/history/analytics`

## Deployment

### Vercel Frontend

1. Push the project to GitHub.
2. Import the repo in Vercel.
3. Set root directory to `textalchemy/client`.
4. Build command: `npm run build`.
5. Output directory: `dist`.
6. Add `VITE_API_URL=https://your-render-api.onrender.com/api`.
7. Deploy.

### Render Backend

1. Create a new Render Web Service from the repo.
2. Set root directory to `textalchemy/server`.
3. Build command: `npm install`.
4. Start command: `npm start`.
5. Add environment variables from `server/.env.example`.
6. Set `CLIENT_URL` to your Vercel URL.
7. Use MongoDB Atlas for `MONGO_URI`.

## OpenAI Integration Path

The placeholder AI logic is isolated in `server/src/utils/aiProcessor.js`. Replace the functions there with OpenAI API calls while keeping the controller and route contracts unchanged.
