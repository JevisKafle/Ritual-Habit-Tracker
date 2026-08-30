from rest_framework import generics
from .serializers import EmailTokenObtainPairSerializer, RegisterSerializer,UserSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response


class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer


class EmailTokenObtainPairView(TokenObtainPairView):
    serializer_class = EmailTokenObtainPairSerializer
    
class MeView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self,request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)
