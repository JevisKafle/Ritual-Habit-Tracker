"use client"

import { useEffect, useState } from "react";

import { getMe as fetchMe } from "@/lib/api-client";
import { ProfilePageProps } from "@/type";
import { IconMail, IconCalendar, IconLogOut } from "@/components/icon"
import { Skeleton } from "@/components/ProfileSkeleton"
import { ProfileDisplayUser } from "@/type";

function getInitials(name: string): string {
    return name
        .trim()
        .split(/\s+/)
        .map(part => part[0]?.toUpperCase() ?? "")
        .slice(0, 2)
        .join("");
}

async function getMe(): Promise<ProfileDisplayUser> {
    const data = await fetchMe();
    return {
        name: data.name,
        email: data.email,
        joinedAt: data.date_joined,
        avatarInitials: getInitials(data.name || data.email),
    };
}


export default function ProfilePage({ stats, onLogout }: ProfilePageProps) {
    const [user, setUser] = useState<ProfileDisplayUser | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getMe()
            .then(setUser)
            .catch(() => setError("Could not load profile."));
    }, []);

    const memberSince = user
        ? new Date(user.joinedAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })
        : null;

    const STATS_DISPLAY = [
        { label: "Total habits", value: stats.totalHabits, icon: "📋" },
        { label: "Total check-ins", value: stats.totalCheckIns, icon: "✅" },
        { label: "Current streak", value: `${stats.currentStreak}d`, icon: "🔥" },
        { label: "Longest streak", value: `${stats.longestStreak}d`, icon: "🏆" },
    ]

    return (
        <div className="min-h-screen bg-page">
            <main className="max-w-2xl mx-auto px-4 py-8 space-y-5">
                {error && (
                    <div className="rounded-2xl p-4 border text-sm bg-(--color-card) border-error text-error">
                        {error}
                    </div>
                )}

                {/* Identity card */}
                <div className="rounded-2xl p-6 border bg-card border-border">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold shrink-0 bg-primary text-primary-text">
                            {user ? user.avatarInitials : ""}
                        </div>

                        <div className="flex-1 min-w-0">
                            {user ? (
                                <>
                                    <h1 className="text-xl font-bold tracking-tight truncate text-foreground">
                                        {user.name}
                                    </h1>
                                    <div className="flex items-center gap-1.5 mt-1 text-muted-foreground">
                                        <IconMail />
                                        <span className="text-sm truncate">{user.email}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 mt-0.5 text-muted-foreground">
                                        <IconCalendar />
                                        <span className="text-xs">Member since {memberSince}</span>
                                    </div>
                                </>
                            ) : (
                                <div className="space-y-2">
                                    <Skeleton style={{ height: 22, width: 140 }} />
                                    <Skeleton style={{ height: 16, width: 180 }} />
                                    <Skeleton style={{ height: 14, width: 120 }} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div>
                    <h2 className="text-xs font-semibold uppercase tracking-wider mb-3 text-muted-foreground" style={{ letterSpacing: "0.08em" }}>
                        Your stats
                    </h2>
                    <div className="grid grid-cols-2 gap-3">
                        {STATS_DISPLAY.map(s => (
                            <div key={s.label} className="rounded-2xl p-4 border bg-card border-border">
                                <div className="text-xl mb-1">{s.icon}</div>
                                <div className="text-2xl font-bold text-foreground">{s.value}</div>
                                <div className="text-xs mt-0.5 text-muted-foreground">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Log out */}
                <button
                    onClick={onLogout}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-semibold border transition-all duration-150 active:scale-[0.98] bg-(--color-card) border-error text-error hover:bg-(--color-hover-surface) cursor-pointer"
                >
                    <IconLogOut />
                    Log out
                </button>
            </main>
        </div>
    );
}