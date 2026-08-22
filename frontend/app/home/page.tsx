import HabitCard from "@/components/HabitCard";
import { Progress } from "@/components/ui/progress";
import { dummyHabits } from "@/lib/dummy";

export default function HomePage() {
  const totalHabits = dummyHabits.length;
  const doneToday = dummyHabits.filter((h) => h.isDoneToday).length;
  const allDone = doneToday === totalHabits;
  const overallProgress = Math.round((doneToday / totalHabits) * 100);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning ";
    if (hour < 17) return "Good afternoon ";
    return "Good evening ";
  };
  return (
    <main className="w-full max-w-3xl mx-auto p-4 space-y-6">
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
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">
            Today's progress
          </span>
          <span className="text-sm font-semibold">{overallProgress}%</span>
        </div>
        <Progress value={overallProgress} className="h-2" />
      </div>

      <div className="pt-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Your Habits
          </h2>
          <span className="text-xs text-muted-foreground">{totalHabits} total</span>
        </div>

        <div className="flex flex-col gap-4">
          {dummyHabits.map((habit) => (
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
    </main>
  );
}
