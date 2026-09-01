# Ritual

A full-stack habit tracker built to go deeper into Django REST Framework — custom serializers, JWT auth, optimistic UI updates, and streak logic — beyond the basics of a typical CRUD app.

Track daily or weekly habits, check in with one tap, and see your consistency over time with a GitHub-style heatmap and streak stats.

## Features

- Email/password registration and login with JWT authentication (access + refresh tokens, silent refresh on expiry)
- Create, edit, and archive habits with custom colors and daily/weekly frequency
- One-tap check-in with optimistic UI updates (instant feedback, rolls back on failure)
- Undo a check-in
- Per-habit stats: current streak, longest streak, completion percentage, total check-ins
- Calendar heatmap of check-in history
- Profile page with account info and stats
- Responsive, custom-designed UI (not a default component-library look)

## Tech Stack

**Frontend**
- Next.js 15 (App Router) + TypeScript
- Tailwind CSS v4
- shadcn/ui
- TanStack Query for server state, caching, and optimistic updates

**Backend**
- Django + Django REST Framework
- SimpleJWT for authentication
- PostgreSQL (SQLite in local development)
- `django-environ` for environment configuration

**Tooling**
- `uv` for Python dependency management

## Architecture Notes

A few decisions worth calling out:

- **Contract-first development** — the frontend was built against dummy data with a self-defined response shape first, then the DRF serializers and views were backfilled to match. This kept the UI moving fast while making sure the two sides had a clear contract to build against.
- **Custom email-based auth** — `CustomUser` extends `AbstractUser` with `USERNAME_FIELD = "email"` instead of Django's default username-based login.
- **Optimistic mutations** — check-in and undo update the UI immediately via TanStack Query's cache, then reconcile with the server in the background. Failed requests roll back to the previous state automatically.
- **Streak calculation** — computed on read from the full set of check-in dates (walk backward from today for current streak, scan for the longest consecutive run for longest streak). Not cached on the model — a deliberate choice to keep things simple first, with room to optimize later if read performance becomes a bottleneck.

## Getting Started

### Backend

```bash
cd backend
uv sync
uv run python manage.py migrate
uv run python manage.py runserver
```

Create a `.env` file in the backend directory:

```
SECRET_KEY=your-secret-key
DEBUG=True
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Create a `.env.local` file in the frontend directory:

```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

The app will be available at `http://localhost:3000`.

## API Overview

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/auth/register/` | Create an account |
| POST | `/api/auth/login/` | Log in, receive JWT pair |
| POST | `/api/auth/refresh/` | Refresh an expired access token |
| GET | `/api/auth/me/` | Get the current user's profile |
| GET/POST | `/api/habits/` | List or create habits |
| GET/PATCH/DELETE | `/api/habits/{id}/` | Retrieve, update, or delete a habit |
| POST/DELETE | `/api/habits/{id}/checkin/` | Check in or undo a check-in |
| GET | `/api/habits/{id}/stats/` | Current streak, longest streak, completion % |

All habit and checkin endpoints require authentication and are scoped to the requesting user.

## Roadmap

- [ ] Weekly-habit-aware streak logic (currently daily-only)
- [ ] Per-habit-card streak display
- [ ] Public landing page for logged-out visitors
- [ ] Google OAuth
- [ ] Dark mode

## Status

Actively in development as a personal learning project.
