from rest_framework import generics
from .serializers import EmailTokenObtainPairSerializer, RegisterSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.views import APIView, Response
from rest_framework.permissions import AllowAny
from .serializers import GoogleLoginSerializer
from rest_framework_simplejwt.tokens import RefreshToken


class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer

class EmailTokenObtainPairView(TokenObtainPairView):
    serializer_class = EmailTokenObtainPairSerializer

class GoogleLoginView(APIView):
    permission_classes = [AllowAny]
    
    def post(self,request):
        serializer = GoogleLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        refresh = RefreshToken.for_user(user)
        return Response({
            "access":str(refresh.access_token),
            "refresh":str(refresh)
        })
