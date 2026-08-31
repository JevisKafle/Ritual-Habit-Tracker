from django.urls import path
from .views import EmailTokenObtainPairView, RegisterView, MeView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", EmailTokenObtainPairView.as_view(), name="login"),
    path("me/", MeView.as_view(), name="me"),
    path("auth/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]
