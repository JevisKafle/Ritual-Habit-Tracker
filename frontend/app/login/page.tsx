"use client";

import { useState } from "react";
import { loginUser } from "@/lib/api-client"
import { useRouter } from "next/navigation";


export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null)

  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null)
    try {
      await loginUser({ email, password })
      router.push("/")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-sm">
        {/*Ritual*/}
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
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 pr-10 rounded-xl text-sm outline-none border bg-secondary border-border text-foreground transition-colors focus:border-primary"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl text-sm font-semibold mt-2 bg-primary text-primary-text cursor-pointer transition-[transform,opacity] duration-150 hover:opacity-90 active:scale-[0.98]"
            >
              Log in
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