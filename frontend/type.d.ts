export type Habit = {
  id: string;
  title: string;
  desc: string;
  isDoneToday: boolean;
  checkIns: string[];
  color: string;
};

export type Frequency = "daily" | "weekly";

export interface HabitModalProps {
  habit: Habit | null;
  onSave: (data: {
    title: string;
    desc: string;
    frequency: Frequency;
    color: string;
  }) => void;
  onCancel: () => void;
}

export interface HabitListProps {
  initialHabits: Habit[];
}

export interface HabitCardProps {
  id: string;
  title: string;
  desc: string;
  isDoneToday: boolean;
  checkIns: string[];
  color: string;
}
