// components/HabitList.tsx
"use client";

import { useState } from "react";
import HabitCard from "@/components/HabitCard";
import { Progress } from "@/components/ui/progress";
import { IconPlus } from "@/components/icon";
import HabitModal from "@/components/HabitModal";
import { HabitListProps } from "@/type";

export default function HabitList({ initialHabits }: HabitListProps) {
    const [habits, setHabits] = useState(initialHabits);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const totalHabits = habits.length;
    const doneToday = habits.filter((h) => h.isDoneToday).length;
    const allDone = doneToday === totalHabits;
    const overallProgress = Math.round((doneToday / totalHabits) * 100);

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good morning ";
        if (hour < 17) return "Good afternoon ";
        return "Good evening ";
    };

    const handleAddHabit = (data: {
        title: string;
        desc: string;
        frequency: "daily" | "weekly";
        color: string;
    }) => {
        const newHabit = {
            title: data.title,
            desc: data.desc,
            isDoneToday: false,
            checkIns: [],
            color: data.color,
        };
        setHabits([...habits, newHabit]);
        setIsModalOpen(false);
    };

    return (
        <>
            {/* Header Section */}
            <div className="space-y-1">
                <h1 className="text-3xl font-bold">{getGreeting()}</h1>
                {allDone ? (
                    <p className="text-base text-green-600 font-medium">
                        All habits done for today — great work!
                    </p>
                ) : (
                    <p className="text-base text-muted-foreground">
                        {doneToday} of {totalHabits} habits done today
                    </p>
                )}
            </div>

            {/* Progress Section */}
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">
                        Today's progress
                    </span>
                    <span className="text-sm font-semibold">{overallProgress}%</span>
                </div>
                <Progress value={overallProgress} className="h-2" />
            </div>

            {/* Habits List */}
            <div className="pt-4">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                        Your Habits
                    </h2>
                    <span className="text-xs text-muted-foreground">{totalHabits} total</span>
                </div>

                <div className="flex flex-col gap-4">
                    {habits.map((habit) => (
                        <HabitCard
                            key={habit.title}
                            title={habit.title}
                            desc={habit.desc}
                            isDoneToday={habit.isDoneToday}
                            checkIns={habit.checkIns}
                            color={habit.color}
                        />
                    ))}
                </div>
            </div>

            {/* + button */}
            <button
                onClick={() => setIsModalOpen(true)}
                className="fixed bg-primary text-primary-text bottom-6 right-6 flex items-center justify-center w-14 h-14 rounded-full shadow-lg hover:shadow-xl active:scale-95 transition-all duration-200 z-50 cursor-pointer"
            >
                <IconPlus />
            </button>

            {/* Habit Modal */}
            {isModalOpen && (
                <HabitModal
                    habit={null}
                    onSave={handleAddHabit}
                    onCancel={() => setIsModalOpen(false)}
                />
            )}
        </>
    );
}