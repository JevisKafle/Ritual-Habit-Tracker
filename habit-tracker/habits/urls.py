from django.urls import path
from .views import HabitViewSet, HabitCheckInViewSet, ProfileStatsView
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r"habits", HabitViewSet, basename="habit")
router.register(r"habit-checkins", HabitCheckInViewSet, basename="habitcheckin")


urlpatterns = router.urls + [
    path("profile/stats/", ProfileStatsView.as_view(), name="profile-stats"),
]
