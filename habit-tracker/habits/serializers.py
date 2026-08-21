from rest_framework import serializers
from .models import Habit, HabitCheckIn


class HabitCheckInSerializer(serializers.ModelSerializer):
    class Meta:
        model = HabitCheckIn
        fields = ["id", "habit", "date", "created_at"]
        read_only_fields = ["id", "created_at"]


class HabitSerializer(serializers.ModelSerializer):
    checkins = HabitCheckInSerializer(many=True, read_only=True)

    class Meta:
        model = Habit
        fields = [
            "id",
            "user",
            "name",
            "description",
            "frequency",
            "color",
            "is_active",
            "created_at",
            "checkins",
        ]
        read_only_fields = ["id", "user", "created_at"]


class HabitCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Habit
        fields = ["id", "name", "description", "frequency", "color"]
        read_only_fields = ["id"]
