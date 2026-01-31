from rest_framework import serializers
from .models import CustomUser
from djoser.serializers import UserCreateSerializer, UserSerializer

class CustomUserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = CustomUser
        fields = ('username', 'email', 'password')

class CustomUserDataSerializer(UserSerializer):
    class Meta:
        model = CustomUser
        fields = ['email', 'username', 'best_wpm', 'avg_wpm']