# Habit Tracker — Project Spec

Django REST Framework backend + React (TanStack Query) frontend.

## 1. Goal

Let a user create habits, check in daily/weekly, and see streaks + completion stats over time.

## 2. Tech Stack

- **Backend:** Django, Django REST Framework, SQLite (dev) / PostgreSQL (later)
- **Auth:** DRF Token Auth or SimpleJWT (pick one — JWT is closer to real-world)
- **Frontend:** React + TanStack Query (+ TanStack Router if you want file-based routing)
- **Styling:** your choice (Tailwind recommended for speed)

## 3. Data Models

### Habit
| Field | Type | Notes |
|---|---|---|
| user | FK → User | owner |
| name | CharField | |
| description | TextField | optional |
| frequency | CharField | `daily` / `weekly` |
| is_active | BooleanField | soft "archive" instead of delete |
| created_at | DateTimeField | auto_now_add |

### HabitCheckIn
| Field | Type | Notes |
|---|---|---|
| habit | FK → Habit | |
| date | DateField | the day being logged, not necessarily today |
| created_at | DateTimeField | auto_now_add |
| unique_together | (habit, date) | prevents duplicate check-ins |

## 4. API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/auth/register/` | create account |
| POST | `/api/auth/login/` | get token/JWT |
| GET | `/api/habits/` | list user's habits |
| POST | `/api/habits/` | create habit |
| GET | `/api/habits/{id}/` | habit detail |
| PATCH | `/api/habits/{id}/` | edit habit |
| DELETE | `/api/habits/{id}/` | delete/archive habit |
| POST | `/api/habits/{id}/checkin/` | check in (optional `date` param, defaults today) |
| DELETE | `/api/habits/{id}/checkin/?date=YYYY-MM-DD` | undo a check-in |
| GET | `/api/habits/{id}/stats/` | current streak, longest streak, completion % |

## 5. Streak Logic (backend)

Compute on read to start:
1. Pull all checkin dates for a habit into a set.
2. Walk backward day-by-day from today.
3. Stop counting when a date is missing from the set.
4. That count = current streak.

Longest streak = same idea but scan the full sorted date list for the longest consecutive run, not just the one ending today.

Optimize later (store `current_streak`/`longest_streak` on the model, update on check-in) only if read performance becomes an issue.

## 6. Permissions

- All habit/checkin endpoints require authentication.
- Queryset always filtered by `request.user` — a user should never see or touch another user's habits.

## 7. Frontend Flow

1. **Login/Register screen** → store token, redirect to dashboard.
2. **Dashboard** → list of habits (`useQuery`), each with a "Check in today" button.
3. **Check-in action** → `useMutation`, optimistic update (mark as done instantly), invalidate habit list + stats query on success.
4. **Habit detail page** → calendar heatmap (GitHub-style) built from checkin dates, streak numbers, completion rate.
5. **Create/edit habit** → simple form, `useMutation`, invalidate list on success.

## 8. Build Order

1. Django project setup, custom User (or default), Habit + HabitCheckIn models, migrations.
2. Auth endpoints (register/login) working end-to-end with Postman/curl.
3. Habit CRUD (DRF ViewSet + router), scoped to `request.user`.
4. Check-in endpoint (`@action` on the ViewSet) + undo.
5. Stats endpoint with streak calculation.
6. Frontend: auth flow → habit list → check-in button (optimistic UI) → stats/heatmap.

## 9. Stretch Goals (once core works)

- Weekly habits: streak logic needs to account for "once per week" instead of daily.
- Reminders via email (Django email backend, no Celery needed for a simple daily digest via a management command + cron).
- Public/shareable read-only habit page.
- Export check-in history as CSV.