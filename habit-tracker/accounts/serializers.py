from rest_framework import serializers
from .models import CustomUser
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
from django.conf import settings


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["email", "password", "name"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            email=validated_data["email"],
            username=validated_data["email"].split("@")[0],
            name=validated_data.get("name", ""),
            password=validated_data["password"],
        )
        return user
    
class EmailTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = "email"

class GoogleLoginSerializer(serializers.Serializer):
    id_token = serializers.CharField()
    
    def validate_id_toke(self,value):
        try:
            idinfo = id_token.verify_oauth2_token(value,google_requests.Request(),settings.GOOGLE_CLIENT_ID)
        except ValueError:
            raise serializers.ValidationError("Invalid  Google token")
        
        if idinfo.get("aud") != settings.GOOGLE_CLIENT_ID:
            raise serializers.ValidationError("Invalid audience")
        
        self.google_data = idinfo
        return value
    
    def save(self):
        email = self.google_data["email"]
        name = self.google_data("name","")
        
        user,created = CustomUser.objects.get_or_create(
            email=email,
            defaults={
                "username": email.split("@")[0],
                "name": name,
            }
        )
        return user
        