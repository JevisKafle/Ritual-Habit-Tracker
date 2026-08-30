from django.urls import path
from .views import EmailTokenObtainPairView, RegisterView,MeView

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", EmailTokenObtainPairView.as_view(), name="login"),
    path("me/", MeView.as_view(), name="me"),
]
