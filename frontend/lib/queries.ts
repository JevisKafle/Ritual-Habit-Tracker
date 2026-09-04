import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  fetchHabits,
  createHabit,
  updateHabit,
  deleteHabit,
  checkInHabit,
  undoCheckIn,
  fetchHabitStats,
  getMe,
  fetchProfileStats
} from "@/lib/api-client";
import type { Habit, Frequency } from "@/type";
import { todayISO } from "./utils";

//current user
export function useCurrentUser() {
  const [hasToken, setHasToken] = useState<boolean | null>(null);

  useEffect(() => {
    setHasToken(Boolean(localStorage.getItem("access_token")));
  }, []);

  return useQuery({
    queryKey: ["currentUser"],
    queryFn: getMe,
    enabled: hasToken === true,
    staleTime: 1000 * 60 * 5,
  });
}

//habits list
export function useHabits() {
  return useQuery({
    queryKey: ["habits"],
    queryFn: fetchHabits,
    staleTime: 1000 * 60 * 5,
  });
}
//create habit
export function useCreateHabit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createHabit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["habits"] });
    },
  });
}

//update
export function useUpdateHabit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<{
        title: string;
        desc: string;
        frequency: Frequency;
        color: string;
      }>;
    }) => updateHabit(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["habits"] });
    },
  });
}

//delete

export function useDeleteHabit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteHabit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["habits"] });
    },
  });
}

//checkin
export function useCheckIn() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ habitId, date }: { habitId: string; date?: string }) =>
      checkInHabit(habitId, date),

    onMutate: async ({ habitId, date }) => {
      await queryClient.cancelQueries({ queryKey: ["habits"] });

      const previousHabits = queryClient.getQueryData<Habit[]>(["habits"]);
      const today = date ?? new Date().toISOString().split("T")[0];

      queryClient.setQueryData<Habit[]>(["habits"], (old) =>
        old?.map((h) =>
          h.id === habitId
            ? {
                ...h,
                isDoneToday:
                  today === new Date().toISOString().split("T")[0]
                    ? true
                    : h.isDoneToday,
                checkIns: h.checkIns.includes(today)
                  ? h.checkIns
                  : [...h.checkIns, today],
              }
            : h,
        ),
      );
      return { previousHabits };
    },
    onError: (_err, _vars, context) => {
      if (context?.previousHabits) {
        queryClient.setQueryData(["habits"], context.previousHabits);
      }
      queryClient.invalidateQueries({ queryKey: ["habits"] });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["habitStats"] });
    },
  });
}

//undo check in
export function useUndoCheckIn() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ habitId, date }: { habitId: string; date?: string }) =>
      undoCheckIn(habitId, date),

    onMutate: async ({ habitId, date }) => {
      await queryClient.cancelQueries({ queryKey: ["habits"] });

      const previousHabits = queryClient.getQueryData<Habit[]>(["habits"]);
      const today = date ?? todayISO();

      queryClient.setQueryData<Habit[]>(["habits"], (old) =>
        old?.map((h) =>
          h.id === habitId
            ? {
                ...h,
                isDoneToday: today === todayISO() ? false : h.isDoneToday,
                checkIns: h.checkIns.filter((d) => d !== today),
              }
            : h,
        ),
      );

      return { previousHabits };
    },

    onError: (_err, _vars, context) => {
      if (context?.previousHabits) {
        queryClient.setQueryData(["habits"], context.previousHabits);
      }
      queryClient.invalidateQueries({ queryKey: ["habits"] });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["habitStats"] }); 
    },
  });
}

//stats
export function useHabitStats(habitId: string) {
  return useQuery({
    queryKey: ["habitStats", habitId],
    queryFn: () => fetchHabitStats(habitId),
    enabled: !!habitId,
  });
}

//profile stats
export function useProfileStats(){
  return useQuery({
    queryKey:["profileStats"],
    queryFn:fetchProfileStats
  })
}
