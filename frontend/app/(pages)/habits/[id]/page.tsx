"use client";
import { useParams } from "next/navigation";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import HabitHeatmap from "@/components/HabitHeatmap";
import { Button } from "@/components/ui/button";
import { useHabits, useHabitStats, useCheckIn, useUndoCheckIn } from "@/lib/queries";

const HabitDetailPage = () => {
    const { id } = useParams<{ id: string }>()

    const { data: habits, isLoading: habitsLoading } = useHabits()
    const habit = habits?.find((h) => h.id === id);

    const { data: stats, isLoading: statsLoading } = useHabitStats(id)

    const checkIn = useCheckIn();
    const undoCheckIn = useUndoCheckIn();

    const handleToggleCheckIn = () => {
        if (!habit) return
        if (habit.isDoneToday) {
            undoCheckIn.mutate({ habitId: habit.id })
        } else {
            checkIn.mutate({ habitId: habit.id })
        }
    }

    if (habitsLoading) return <div>Loading...</div>;
    if (!habit) return <div>Habit not found</div>;

    const statCards = [
        { icon: "🔥", value: `${stats?.current_streak ?? "-"}d`, label: "Current streak" },
        { icon: "🏆", value: `${stats?.longest_streak ?? "-"}d`, label: "Longest streak" },
        { icon: "📊", value: `${stats?.completion_percentage ?? "-"}%`, label: "Completion" },
        { icon: "✅", value: `${stats?.total_checkins ?? "-"}`, label: "Total check-ins" },
    ];
    return (
        <main className="w-full max-w-3xl mx-auto p-4 space-y-6 my-6">
            <Card className=" ring-0 shadow-md">
                <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                        <div>
                            <CardTitle className="text-2xl font-bold flex items-center gap-2">
                                <div
                                    className="w-4 h-4 rounded-full shrink-0"
                                    style={{ background: habit.color }}
                                />
                                {habit.title}
                            </CardTitle>
                            <CardDescription className="text-muted-foreground py-2">
                                {habit.desc}
                            </CardDescription>
                            <CardContent className="py-1 px-0">
                                <span className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-700">
                                    {habit.frequency}
                                </span>
                                <span className="text-sm text-gray-500 px-4">
                                    Since{" "}
                                    {new Date(habit.checkIns[0]).toLocaleDateString("en-US", {
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </span>
                            </CardContent>
                        </div>
                    </div>
                </CardHeader>
            </Card>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {statCards.map((stat) => (
                    <Card key={stat.label} className="rounded-2xl">
                        <CardContent className="flex flex-col items-center justify-center py-6">
                            <span className="mb-2 text-2xl">{stat.icon}</span>
                            <span className="text-2xl font-bold">
                                {statsLoading ? "..." : stat.value}
                            </span>
                            <span className="mt-1 text-sm text-muted-foreground">
                                {stat.label}
                            </span>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <Card className="ring-0 shadow-md">
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-bold">Check-in History</CardTitle>
                </CardHeader>
                <CardContent>
                    <HabitHeatmap checkIns={habit.checkIns} color={habit.color} />
                </CardContent>
            </Card>
            {habit.isDoneToday ? (
                <Button
                    className="w-full py-6 rounded-2xl text-primary-text text-md bg-muted-green cursor-pointer"
                    variant="ghost"
                    onClick={handleToggleCheckIn} 
                >
                    Checked in
                </Button>
            ) : (
                <Button
                    className="w-full py-6 rounded-2xl text-primary-text cursor-pointer text-md"
                    onClick={handleToggleCheckIn} 
                >
                    Check in today
                </Button>
            )}

        </main>
    )
}

export default HabitDetailPage
