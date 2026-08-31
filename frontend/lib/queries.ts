const API_URL = process.env.NEXT_PUBLIC_API_URL;

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

export async function getMe() {
  const res = await authFetch(`${API_URL}/auth/me/`);
  if (!res.ok) {
    throw new Error("Failed to fetch profile");
  }
  return res.json();
}

export function logoutUser() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
}
