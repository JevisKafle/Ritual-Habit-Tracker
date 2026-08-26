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
              Sign in
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