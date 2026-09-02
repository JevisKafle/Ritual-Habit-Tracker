export type Habit = {
  id: string;
  title: string;
  desc: string;
  frequency: Frequency;
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
  onCheckIn: () => void;
}

export type User = {
  id: number
  email: string
  name: string
  username: string
}

export interface ProfilePageProps {
  stats: ProfileStats;
  onLogout: () => void;
}

export interface ProfileStats {
  totalHabits: number;
  totalCheckIns: number;
  longestStreak: number;
  currentStreak: number;
}

interface ProfileDisplayUser {
    name: string;
    email: string;
    joinedAt: string;
    avatarInitials: string;
}

type BackendCheckIn = {
  id: number;
  habit: number;
  date: string;
  created_at: string;
};

type BackendHabit = {
  id: number;
  user: number;
  name: string;
  description: string;
  frequency: Frequency;
  color: string;
  is_active: boolean;
  created_at: string;
  checkins: BackendCheckIn[];
};

export type HabitStats = {
  current_streak: number;
  longest_streak: number;
  completion_percentage: number;
  total_checkins: number;
};

export interface LandingPageProps {
    onLogin: () => void;
    onSignUp: () => void;
    onGoToHabits: () => void;
}