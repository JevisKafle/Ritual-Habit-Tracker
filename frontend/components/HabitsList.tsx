"use client";

import { useState } from "react";
import HabitCard from "@/components/HabitCard";
import { Progress } from "@/components/ui/progress";
import { IconPlus } from "@/components/icon";
import HabitModal from "@/components/HabitModal";
import { useHabits, useCreateHabit, useCheckIn, useUndoCheckIn } from "@/lib/queries";
import HabitCardSkeleton from "@/components/HabitCardSkeleton";

export default function HabitList() {
    const { data: habits, isLoading } = useHabits();
    const createHabit = useCreateHabit();
    const checkIn = useCheckIn();
    const undoCheckIn = useUndoCheckIn();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const totalHabits = habits?.length ?? 0;
    const doneToday = habits?.filter((h) => h.isDoneToday).length ?? 0;
    const allDone = totalHabits > 0 && doneToday === totalHabits;
    const overallProgress = totalHabits > 0 ? Math.round((doneToday / totalHabits) * 100) : 0;

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
        createHabit.mutate(data);
        setIsModalOpen(false)
    };

    const handleToggleCheckIn = (habitId: string, isDoneToday: boolean) => {
        if (isDoneToday) {
            undoCheckIn.mutate({ habitId });
        } else {
            checkIn.mutate({ habitId });
        }
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
                    {isLoading ? (
                        <>
                            <HabitCardSkeleton />
                            <HabitCardSkeleton />
                            <HabitCardSkeleton />
                        </>
                    ) : (
                        habits?.map((habit) => (
                            <HabitCard
                                id={habit.id}
                                key={habit.id}
                                title={habit.title}
                                desc={habit.desc}
                                isDoneToday={habit.isDoneToday}
                                checkIns={habit.checkIns}
                                color={habit.color}
                                onCheckIn={() => handleToggleCheckIn(habit.id, habit.isDoneToday)}
                            />
                        ))
                    )}
                </div>
            </div>

            {/* + button */}
            <button
                onClick={() => setIsModalOpen(true)}
                className="fixed bg-primary text-primary-text bottom-6 right-6 flex items-center justify-center w-14 h-14 rounded-full shadow-lg hover:shadow-xl active:scale-95 transition-all duration-200 z-50 cursor-pointer"
            >
                <IconPlus />
            </button>

            {/*Modal */}
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