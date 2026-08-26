"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log({ email, password });
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-sm">
        {/* Brand */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-4 bg-primary">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center  bg-primary">
              <svg width="24" height="24" viewBox="0 0 16 16" fill="none">
                <path d="M8 2C5.8 2 4 4 4 6.5c0 3.2 4 7.5 4 7.5s4-4.3 4-7.5C12 4 10.2 2 8 2z" fill="white" />
                <circle cx="8" cy="6.5" r="1.8" fill="rgba(255,255,255,0.5)" />
              </svg>
            </div>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Ritual</h1>
          <p className="text-sm mt-1 text-muted-foreground">Build habits that stick.</p>
        </div>

        {/* Card */}
        <div className="rounded-2xl p-8 shadow-sm border bg-card border-border">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1.5 text-foreground">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none border bg-secondary border-border text-foreground transition-colors focus:border-primary"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1.5 text-foreground">
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none border bg-secondary border-border text-foreground transition-colors focus:border-primary"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl text-sm font-semibold mt-2 bg-primary text-primary-text cursor-pointer transition-[transform,opacity] duration-150 hover:opacity-90 active:scale-[0.98]"
            >
              Log in
            </button>
            <button
              type="button"
              onClick={() => console.log("google login clicked")}
              className="w-full py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 border border-border bg-card text-foreground transition-[transform,opacity] duration-150 hover:opacity-90 active:scale-[0.98] cursor-pointer"
            >
              <svg width="18" height="18" viewBox="0 0 18 18">
                <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.91c1.7-1.57 2.69-3.88 2.69-6.62z" />
                <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.91-2.26c-.81.54-1.85.86-3.05.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 0 0 9 18z" />
                <path fill="#FBBC05" d="M3.97 10.72A5.4 5.4 0 0 1 3.68 9c0-.6.1-1.18.29-1.72V4.95H.96A9 9 0 0 0 0 9c0 1.45.35 2.83.96 4.05l3.01-2.33z" />
                <path fill="#EA4335" d="M9 3.58c1.32 0 2.51.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .96 4.95l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58z" />
              </svg>
              Continue with Google
            </button>
          </form>

          <p className="text-center text-xs mt-4 text-muted-foreground">
            <button className="underline underline-offset-2 text-primary cursor-pointer">Forgot password?</button>
          </p>
        </div>

        <p className="text-center text-xs mt-6 text-muted-foreground">
          No account?{" "}
          <a href="/register" className="font-medium underline underline-offset-2 text-primary">
            Create one
          </a>
        </p>
      </div>
    </div>
  );
}