import { useState, useEffect } from "react";
import { LandingPageProps } from "@/type";
import { Flame, Calendar, Zap, BarChart3, Palette, Sparkles, Check } from "lucide-react";

const DEMO_HABITS = [
    { name: "Morning Meditation", streak: 14, color: "#0F766E", done: true },
    { name: "Read 30 Minutes", streak: 7, color: "#7C3AED", done: true },
    { name: "Evening Walk", streak: 3, color: "#059669", done: false },
];

function DemoCard({
    name,
    streak,
    color,
    done,
    delay,
}: {
    name: string;
    streak: number;
    color: string;
    done: boolean;
    delay: number;
}) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setVisible(true), delay);
        return () => clearTimeout(t);
    }, [delay]);

    const last7 = [true, true, false, true, true, true, done];

    return (
        <div
            className={`rounded-2xl border bg-card border-border p-4 shadow-sm transition-all duration-500 ${visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                }`}
        >
            <div className="mb-3 flex items-center justify-between">
                <div className="flex min-w-0 items-center gap-2">
                    <div className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: color }} />
                    <span className="truncate text-sm font-semibold text-foreground">{name}</span>
                </div>

                <div className="flex shrink-0 items-center gap-1 rounded-full bg-orange-50 px-2 py-0.5 text-xs font-semibold text-orange-600">
                    <Flame className="w-3.5 h-3.5" /> {streak}d
                </div>
            </div>

            <div className="mb-3 flex gap-1">
                {last7.map((checked, i) => (
                    <div
                        key={i}
                        className={`h-1.5 flex-1 rounded-full ${checked ? "" : "bg-muted opacity-40"}`}
                        style={checked ? { backgroundColor: color, opacity: 0.85 } : undefined}
                    />
                ))}
            </div>

            <div className="flex">
                <div
                    className={`ml-auto inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold ${done
                            ? "border border-green-200 bg-green-50 text-green-700"
                            : "bg-primary text-primary-text"
                        }`}
                >
                    {done ? <><Check className="w-3.5 h-3.5" /> Done today</> : "Check in"}
                </div>
            </div>
        </div>
    );
}

function FeatureCard({
    icon,
    title,
    body,
}: {
    icon: React.ReactNode;
    title: string;
    body: string;
}) {
    return (
        <div className="rounded-2xl border bg-card border-border p-5">
            <div className="mb-3 text-primary">{icon}</div> 
            <h3 className="mb-1.5 text-base font-semibold text-foreground">{title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
        </div>
    );
}

export default function LandingPage({
    onLogin,
    onSignUp,
    onGoToHabits, 
}: LandingPageProps) {
    const [heroVisible, setHeroVisible] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); 

    useEffect(() => {
        const t = setTimeout(() => setHeroVisible(true), 80);
        return () => clearTimeout(t);
    }, []);

    useEffect(() => {
        setIsLoggedIn(!!localStorage.getItem("access_token"));
    }, []);

    return (
        <div className="min-h-screen bg-page">
            {/* Hero */}
            <section className="mx-auto max-w-5xl px-5 pb-16 pt-20">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
                    <div
                        className="transition-all duration-700"
                        style={{
                            opacity: heroVisible ? 1 : 0,
                            transform: heroVisible ? "translateY(0)" : "translateY(20px)",
                        }}
                    >
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-card border-border px-3 py-1.5 text-xs font-semibold text-primary">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                            Small habits. Big change.
                        </div>

                        <h1 className="mb-5 text-4xl font-bold leading-tight tracking-tight text-foreground lg:text-5xl">
                            Build habits that
                            <br />
                            <span className="text-primary">actually stick.</span>
                        </h1>

                        <p className="mb-8 max-w-md text-base leading-relaxed text-muted-foreground">
                            Ritual helps you track daily habits, visualize your consistency, and stay on a streak
                            without the noise. No gamification gimmicks. Just you and your goals.
                        </p>

                        <div className="flex flex-wrap items-center gap-3">
                            {isLoggedIn ? (
                                <button
                                    onClick={onGoToHabits}
                                    className="rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-primary-text shadow-sm transition-all duration-150 hover:opacity-90 active:scale-[0.97] cursor-pointer"
                                >
                                    Go to your habits
                                </button>
                            ) : (
                                <>
                                    <button
                                        onClick={onSignUp}
                                        className="rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-primary-text shadow-sm transition-all duration-150 hover:opacity-90 active:scale-[0.97]"
                                    >
                                        Start for free
                                    </button>
                                    <button
                                        onClick={onLogin}
                                        className="rounded-2xl border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-all duration-150 active:scale-[0.97]"
                                    >
                                        Sign in
                                    </button>
                                </>
                            )}
                        </div>

                        {!isLoggedIn && (
                            <p className="mt-4 text-xs text-muted-foreground">
                                No credit card needed · Free forever
                            </p>
                        )}
                    </div>

                    <div className="space-y-3 lg:pl-4">
                        {DEMO_HABITS.map((habit, i) => (
                            <DemoCard key={habit.name} {...habit} delay={300 + i * 140} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="mx-auto max-w-5xl px-5 py-20">
                <div className="mb-12 text-center">
                    <h2 className="mb-3 text-2xl font-bold tracking-tight text-foreground">
                        Everything you need. Nothing you don't.
                    </h2>
                    <p className="mx-auto max-w-md text-sm text-muted-foreground">
                        Ritual is built around one idea: make showing up as frictionless as possible.
                    </p>
                </div>
                {/*feature card */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <FeatureCard
                        icon={<Flame className="w-6 h-6" />}
                        title="Streak tracking"
                        body="See your current and longest streaks at a glance. Consistency is the only metric that matters."
                    />
                    <FeatureCard
                        icon={<Calendar className="w-6 h-6" />}
                        title="Calendar heatmap"
                        body="A GitHub-style heatmap shows your full check-in history — instantly see patterns and gaps."
                    />
                    <FeatureCard
                        icon={<Zap className="w-6 h-6" />}
                        title="One-tap check-in"
                        body="Check off a habit in a single tap. No forms, no friction — done in a second."
                    />
                    <FeatureCard
                        icon={<BarChart3 className="w-6 h-6" />}
                        title="Completion stats"
                        body="Track your completion rate and longest streak per habit so you know where to focus."
                    />
                    <FeatureCard
                        icon={<Palette className="w-6 h-6" />}
                        title="Custom habits"
                        body="Name it, describe it, pick a color. Daily or weekly — Ritual adapts to how you live."
                    />
                </div>
            </section>

            {/* CTA */}
            <section className="mx-auto max-w-5xl px-5 pb-20">
                <div className="rounded-3xl border bg-card border-border p-10 text-center">
                    <div className="mb-4 flex justify-center text-primary">
                        <Sparkles className="w-8 h-8" />
                    </div>

                    {isLoggedIn ? (
                        <>
                            <h2 className="mb-3 text-2xl font-bold tracking-tight text-foreground">
                                Ready to check in today?
                            </h2>
                            <p className="mx-auto mb-8 max-w-sm text-sm text-muted-foreground">
                                Jump back into your habits and keep the streak going.
                            </p>
                            <button
                                onClick={onGoToHabits}
                                className="rounded-2xl bg-primary px-7 py-3 text-sm font-semibold text-primary-text shadow-sm transition-all duration-150 hover:opacity-90 active:scale-[0.97]"
                            >
                                Go to habits
                            </button>
                        </>
                    ) : (
                        <>
                            <h2 className="mb-3 text-2xl font-bold tracking-tight text-foreground">
                                Ready to build your first ritual?
                            </h2>
                            <p className="mx-auto mb-8 max-w-sm text-sm text-muted-foreground">
                                Join thousands of people who show up every day — one habit at a time.
                            </p>
                            <div className="flex flex-wrap items-center justify-center gap-3">
                                <button
                                    onClick={onSignUp}
                                    className="rounded-2xl bg-primary px-7 py-3 text-sm font-semibold text-primary-text shadow-sm transition-all duration-150 hover:opacity-90 active:scale-[0.97]"
                                >
                                    Create free account
                                </button>
                                <button
                                    onClick={onLogin}
                                    className="rounded-2xl border border-border px-7 py-3 text-sm font-semibold text-foreground transition-all duration-150 active:scale-[0.97]"
                                >
                                    Already have an account
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-border py-8">
                <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-5">
                    <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary">
                            <Sparkles className="w-3.5 h-3.5 text-white" />
                        </div>
                        <span className="text-sm font-semibold text-foreground">Ritual</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                        © 2026 Ritual. Built for builders of better habits.
                    </p>
                </div>
            </footer>
        </div>
    );
}