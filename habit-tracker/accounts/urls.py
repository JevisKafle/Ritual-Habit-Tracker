from django.urls import path
from .views import EmailTokenObtainPairView, RegisterView,GoogleLoginView

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", EmailTokenObtainPairView.as_view(), name="login"),
    path("google/",GoogleLoginView.as_view(),name="google-login")
]
