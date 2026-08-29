from rest_framework import serializers
from .models import CustomUser
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


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