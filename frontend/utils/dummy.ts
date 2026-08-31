type HabitFrequency = "daily" | "weekly";

type Habit = {
  id: string;
  title: string;
  desc: string;
  frequency: HabitFrequency;
  isDoneToday: boolean;
  color: string;
  checkIns: string[];
};

export const dummyHabits: Habit[] = [
  {
    id: "1",
    title: "Morning Exercise",
    desc: "30 minutes of exercise",
    frequency: "daily",
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
    id: "2",
    title: "Read a Book",
    desc: "Read at least 20 pages",
    frequency: "daily",
    isDoneToday: false,
    color: "#3B82F6",
    checkIns: ["2026-08-16", "2026-08-18", "2026-08-19", "2026-08-21"],
  },
  {
    id: "3",
    title: "Drink Water",
    desc: "Drink 8 glasses of water",
    frequency: "daily",
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
    id: "4",
    title: "Meditation",
    desc: "10 minutes of mindfulness",
    frequency: "weekly",
    isDoneToday: false,
    color: "#10B981",
    checkIns: ["2026-08-16", "2026-08-17", "2026-08-20"],
  },
  {
    id: "5",
    title: "Learn Coding",
    desc: "Practice coding for 1 hour",
    frequency: "daily",
    isDoneToday: true,
    color: "#F59E0B",
    checkIns: [
      "2026-08-26",
      "2026-08-27",
      "2026-08-28",
      "2026-08-29",
      "2026-08-30",
      "2026-08-31",
      "2026-09-01",
    ],
  },
];

export const dummyProfileStats = {
  totalHabits: 5,
  totalCheckIns: 142,
  longestStreak: 21,
  currentStreak: 6,
};