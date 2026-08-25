import { dummyHabits } from "@/lib/dummy";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import HabitHeatmap from "@/components/HabitHeatmap";

const stats = [
    {
        icon: "🔥",
        value: "9d",
        label: "Current streak",
    },
    {
        icon: "🏆",
        value: "9d",
        label: "Longest streak",
    },
    {
        icon: "📊",
        value: "50%",
        label: "Completion",
    },
    {
        icon: "✅",
        value: "23",
        label: "Total check-ins",
    },
];


const HabitDetailPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const habit = dummyHabits.find((h) => h.id === id);

    if (!habit) return <div>Habit not found</div>;
    return (
        <main className="w-full max-w-3xl mx-auto p-4 space-y-6 my-6">
            <Card className=" ring-0 shadow-md">
                <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                        <div>
                            <CardTitle className="text-2xl font-bold">{habit.title}</CardTitle>
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
                {stats.map((stat) => (
                    <Card key={stat.label} className="rounded-2xl">
                        <CardContent className="flex flex-col items-center justify-center py-6">
                            <span className="mb-2 text-2xl">{stat.icon}</span>
                            <span className="text-2xl font-bold">
                                {stat.value}
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
        </main>
    )
}

export default HabitDetailPage
