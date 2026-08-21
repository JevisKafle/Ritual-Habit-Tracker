from django.urls import path
from .views import HabitViewSet, HabitCheckInViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r"habits", HabitViewSet, basename="habit")
router.register(r"habit-checkins", HabitCheckInViewSet, basename="habitcheckin")


urlpatterns = router.urls
