from datetime import datetime, timedelta
from django.utils import timezone
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import viewsets, permissions, status
from .serializers import HabitCheckInSerializer, HabitSerializer, HabitCreateSerializer
from .models import HabitCheckIn, Habit


class HabitViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Habit.objects.filter(user=self.request.user)

    def get_serializer_class(self):
        if self.action == "create":
            return HabitCreateSerializer
        return HabitSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=True, methods=["post"])
    def checkin(self, request, pk=None):
        habit = self.get_object()
        date_str = request.data.get("date")
        date = (
            datetime.strptime(date_str, "%Y-%m-%d").date()
            if date_str
            else timezone.now().date()
        )
        checkin, created = HabitCheckIn.objects.get_or_create(habit=habit, date=date)
        if not created:
            return Response(
                {"detail": "Already checked in for this date."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        serializer = HabitCheckInSerializer(checkin)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @checkin.mapping.delete
    def undo_checkin(self, request, pk=None):
        habit = self.get_object()
        date_str = request.query_params.get("date")
        date = (
            datetime.strptime(date_str, "%Y-%m-%d").date()
            if date_str
            else timezone.now().date()
        )
        deleted, _ = HabitCheckIn.objects.filter(habit=habit, date=date).delete()
        if not deleted:
            return Response(
                {"detail": "No check-in found for this date."},
                status=status.HTTP_404_NOT_FOUND,
            )
        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(detail=True, methods=["get"])
    def stats(self, request, pk=None):
        habit = self.get_object()
        dates = set(habit.checkins.values_list("date", flat=True))
        # current streak
        current_streak = 0
        day = timezone.now().date()
        while day in dates:
            current_streak += 1
            day -= timedelta(days=1)

        # longest streak
        sorted_dates = sorted(dates)
        longest_streak = 0
        run = 0
        prev = None
        for d in sorted_dates:
            if prev and (d - prev).days == 1:
                run += 1
            else:
                run = 1
            longest_streak = max(longest_streak, run)
            prev = d
        total_days = (timezone.now().date() - habit.created_at.date()).days + 1
        completion_pct = (
            round((len(dates) / total_days) * 100, 1) if total_days > 0 else 0
        )

        return Response(
            {
                "current_streak": current_streak,
                "longest_streak": longest_streak,
                "completion_percentage": completion_pct,
                "total_checkins": len(dates),
            }
        )


class HabitCheckInViewSet(viewsets.ModelViewSet):
    serializer_class = HabitCheckInSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return HabitCheckIn.objects.filter(habit__user=self.request.user)
