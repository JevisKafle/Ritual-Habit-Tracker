import HabitCard from "@/components/HabitCard";

const dummyHabits = [
  {
    title: "Morning Exercise",
    desc: "30 minutes of exercise",
    isDoneToday: true,
    color: "#8B5CF6",
    checkIns: [
      "2026-08-16",
      "2026-08-17",
      "2026-08-18",
      "2026-08-20",
      "2026-08-21",
      "2026-08-22",
    ],
  },
  {
    title: "Read a Book",
    desc: "Read at least 20 pages",
    isDoneToday: false,
    color: "#3B82F6",
    checkIns: [
      "2026-08-16",
      "2026-08-18",
      "2026-08-19",
      "2026-08-21",
    ],
  },
  {
    title: "Drink Water",
    desc: "Drink 8 glasses of water",
    isDoneToday: true,
    color: "#06B6D4",
    checkIns: [
      "2026-08-17",
      "2026-08-18",
      "2026-08-19",
      "2026-08-20",
      "2026-08-22",
    ],
  },
  {
    title: "Meditation",
    desc: "10 minutes of mindfulness",
    isDoneToday: false,
    color: "#10B981",
    checkIns: [
      "2026-08-16",
      "2026-08-17",
      "2026-08-20",
    ],
  },
  {
    title: "Learn Coding",
    desc: "Practice coding for 1 hour",
    isDoneToday: true,
    color: "#F59E0B",
    checkIns: [
      "2026-08-16",
      "2026-08-17",
      "2026-08-18",
      "2026-08-19",
      "2026-08-20",
      "2026-08-21",
      "2026-08-22",
    ],
  },
];

export default function Home() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-center">Your habits</h1>
      <div className="flex flex-col items-center gap-4 mt-4">
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
  );
}
