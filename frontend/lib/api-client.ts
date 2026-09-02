const API_URL = process.env.NEXT_PUBLIC_API_URL;

import { HABIT_COLORS } from "@/utils/utils";
import type {
  Habit,
  Frequency,
  BackendHabit,
  HabitStats,
} from "@/type";

//error for registration
function extractRegisterError(error: any): string {
  const emailError = error?.email?.[0];
  const passwordError = error?.password?.[0];
  const nameError = error?.name?.[0];
  const detailError = error?.detail;

  if (emailError) {
    const msg = emailError.toLowerCase();
    if (msg.includes("already exists") || msg.includes("unique")) {
      return "An account with this email already exists. Try logging in instead.";
    }
    if (msg.includes("valid")) {
      return "Please enter a valid email address.";
    }
    return emailError;
  }

  if (passwordError) {
    const msg = passwordError.toLowerCase();
    if (msg.includes("too short") || msg.includes("at least")) {
      return "Password must be at least 8 characters.";
    }
    if (msg.includes("common")) {
      return "That password is too common. Try something more unique.";
    }
    if (msg.includes("numeric")) {
      return "Password can't be entirely numbers.";
    }
    return passwordError;
  }

  if (nameError) {
    return "Please enter your name.";
  }

  return detailError ?? "Something went wrong. Please try again.";
}

//actual register
export async function registerUser(data: {
  name: string;
  email: string;
  password: string;
}) {
  const res = await fetch(`${API_URL}/auth/register/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => null);
    throw new Error(extractRegisterError(error));
  }
  return res.json();
}

//login duh!
export async function loginUser(data: { email: string; password: string }) {
  const res = await fetch(`${API_URL}/auth/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error("Invalid email or password.");
  }

  const tokens = await res.json();
  localStorage.setItem("access_token", tokens.access);
  localStorage.setItem("refresh_token", tokens.refresh);
  return tokens;
}

//jwt doesnt expire
export async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = localStorage.getItem("refresh_token");
  if (!refreshToken) return null;

  const res = await fetch(`${API_URL}/auth/refresh/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh: refreshToken }),
  });

  if (!res.ok) return null;

  const data = await res.json();
  localStorage.setItem("access_token", data.access);
  return data.access;
}

//same for jwt
async function authFetch(
  url: string,
  options: RequestInit = {},
): Promise<Response> {
  const token = localStorage.getItem("access_token");

  const doFetch = (accessToken: string | null) =>
    fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    });

  let res = await doFetch(token);

  if (res.status === 401) {
    const newToken = await refreshAccessToken();
    if (!newToken) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      window.location.href = "/login";
      throw new Error("Session expired. Please log in again.");
    }
    res = await doFetch(newToken);
  }

  return res;
}

//for getting user info
export async function getMe() {
  const res = await authFetch(`${API_URL}/auth/me/`);
  if (!res.ok) {
    throw new Error("Failed to fetch profile");
  }
  return res.json();
}

//logout
export function logoutUser() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
}

//_______
//habits
const COLOR_NAMES = [
  "indigo",
  "purple",
  "pink",
  "red",
  "amber",
  "emerald",
  "blue",
  "violet",
];

export const COLOR_MAP: Record<string, string> = Object.fromEntries(
  COLOR_NAMES.map((name, i) => [name, HABIT_COLORS[i]]),
);

function hexToColorName(hex: string): string {
  return Object.entries(COLOR_MAP).find(([, h]) => h === hex)?.[0] ?? "indigo";
}

//conversion from backend to frontend
function mapHabit(raw: BackendHabit): Habit {
  const checkInDates = raw.checkins.map((c) => c.date);
  const today = new Date().toISOString().split("T")[0];

  return {
    id: String(raw.id),
    title: raw.name,
    desc: raw.description,
    frequency: raw.frequency,
    color: COLOR_MAP[raw.color] ?? "#4F46E5",
    checkIns: checkInDates,
    isDoneToday: checkInDates.includes(today),
  };
}

//queries

export async function fetchHabits(): Promise<Habit[]> {
  const res = await authFetch(`${API_URL}/habits/`);
  if (!res.ok) throw new Error("failed to fetch habits");

  const data: BackendHabit[] = await res.json();
  return data.map(mapHabit);
}

export async function createHabit(data: {
  title: string;
  desc: string;
  frequency: Frequency;
  color: string;
}): Promise<Habit> {
  const res = await authFetch(`${API_URL}/habits/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: data.title,
      description: data.desc,
      frequency: data.frequency,
      color: hexToColorName(data.color),
    }),
  });
  if (!res.ok) throw new Error("Failed to create habit");

  const raw = await res.json();
  return mapHabit({ ...raw, checkins: [] });
}

export async function updateHabit(
  id: string,
  data: Partial<{
    title: string;
    desc: string;
    frequency: Frequency;
    color: string;
  }>,
): Promise<Habit> {
  const body: Record<string, unknown> = {};
  if (data.title !== undefined) body.name = data.title;
  if (data.desc !== undefined) body.description = data.desc;
  if (data.frequency !== undefined) body.frequency = data.frequency;
  if (data.color !== undefined) body.color = hexToColorName(data.color);

  const res = await authFetch(`${API_URL}/habits/${id}/`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error("Failed to update habit");

  return mapHabit(await res.json());
}

export async function deleteHabit(id: string): Promise<void> {
  const res = await authFetch(`${API_URL}/habits/${id}/`, { method: "DELETE" });

  if (!res.ok) throw new Error("failed to delete habit");
}

//checkin

export async function checkInHabit(
  habitId: string,
  date?: string,
): Promise<void> {
  const res = await authFetch(`${API_URL}/habits/${habitId}/checkin/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(date ? { date } : {}),
  });
  if (!res.ok) throw new Error("Failed to check in");
}

export async function undoCheckIn(
  habitId: string,
  date?: string,
): Promise<void> {
  const query = date ? `?date=${date}` : "";
  const res = await authFetch(`${API_URL}/habits/${habitId}/checkin/${query}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to undo check-in");
}

export async function fetchHabitStats(habitId: string): Promise<HabitStats> {
  const res = await authFetch(`${API_URL}/habits/${habitId}/stats/`);
  if (!res.ok) throw new Error("Failed to fetch stats");
  return res.json();
}
