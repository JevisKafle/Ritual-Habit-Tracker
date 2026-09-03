"use client"

import { ProfilePageProps } from "@/type";
import { Flame, Mail, Calendar, LogOut, TrophyIcon, Check } from "lucide-react";
import { Skeleton } from "@/components/ProfileSkeleton"


export default function ProfilePage({ user, stats, onLogout }: ProfilePageProps) {

    const memberSince = user
        ? new Date(user.joinedAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })
        : null;

    const STATS_DISPLAY = [
        { label: "Total habits", value: stats.totalHabits, icon: <Calendar /> },
        { label: "Total check-ins", value: stats.totalCheckIns, icon: <Check /> },
        { label: "Current streak", value: `${stats.currentStreak}d`, icon: <Flame /> },
        { label: "Longest streak", value: `${stats.longestStreak}d`, icon: <TrophyIcon /> },
    ]

    return (
        <div className="min-h-screen bg-page">
            <main className="max-w-2xl mx-auto px-4 py-8 space-y-5">
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
                                        <Mail className="w-3.5 h-3.5" />
                                        <span className="text-sm truncate">{user.email}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 mt-0.5 text-muted-foreground">
                                        <Calendar className="w-3.5 h-3.5" />
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

                <button
                    onClick={onLogout}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-semibold border transition-all duration-150 active:scale-[0.98] bg-(--color-card) border-error text-error hover:bg-(--color-hover-surface) cursor-pointer"
                >
                    <LogOut className="w-4 h-4" />
                    Log out
                </button>
            </main>
        </div>
    );
}