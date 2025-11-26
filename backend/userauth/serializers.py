from rest_framework import serializers
from .models import CustomUser

class CustomUserDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['email', 'username', 'best_wpm', 'avg_wpm']

class CustomUserLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['wpm_log']