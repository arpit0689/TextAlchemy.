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


```




## OpenAI Integration Path

The placeholder AI logic is isolated in `server/src/utils/aiProcessor.js`. Replace the functions there with OpenAI API calls while keeping the controller and route contracts unchanged.
