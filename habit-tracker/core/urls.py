from django.contrib import admin
from django.urls import path, include
from .views import health_check

urlpatterns = [
    path("api/health/", health_check, name="health-check"),
    path("admin/", admin.site.urls),
    path("api/", include("habits.urls")),
    path("api/auth/", include("accounts.urls")),
    path("api-auth/", include("rest_framework.urls")),
]
