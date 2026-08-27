from django.db import models
from django.conf import settings


class Habit(models.Model):
    FREQUENCY_CHOICE = [("daily", "Daily"), ("weekly", "Weekly")]

    COLOR_CHOICES = [
        ("green", "Green"),
        ("purple", "Purple"),
        ("blue", "Blue"),
        ("orange", "Orange"),
        ("pink", "Pink"),
    ]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="habits"
    )
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    frequency = models.CharField(
        max_length=10, choices=FREQUENCY_CHOICE, default="daily"
    )
    color = models.CharField(max_length=10, choices=COLOR_CHOICES, default="green")
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["created_at"]

    def __str__(self):
        return f"{self.name} ({self.user})"


class HabitCheckIn(models.Model):
    habit = models.ForeignKey(Habit, on_delete=models.CASCADE, related_name="checkins")
    date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ["habit", "date"]
        ordering = ["-date"]

    def __str__(self):
        return f"{self.habit.name} - {self.date}"
