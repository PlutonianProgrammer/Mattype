# from rest_framework import serializers
# from .models import UserProfile
# from django.contrib.auth.models import User
# from djoser.serializers import UserCreateSerializer

# class OverrideSerializer(UserCreateSerializer):
#     class Meta(UserCreateSerializer.Meta):
#         model = User
#         fields = ('id', 'username', 'password')

# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ['username', 'email']

# class UserProfileSerializer(serializers.ModelSerializer):
#     user = UserSerializer()

#     class Meta:
#         model = UserProfile
#         fields = ['user', 'wpm_log', 'best_wpm', 'avg_wpm']

from djoser.serializers import UserCreateSerializer, UserSerializer
from rest_framework import serializers
from .models import CustomUser

class CustomUserCreateSerializer(UserCreateSerializer):
    re_password = serializers.CharField(write_only=True, required=True)

    class Meta(UserCreateSerializer.Meta):
        model = CustomUser
        fields = ('id', 'username', 'email', 'password', 're_password', 'best_wpm', 'avg_wpm', 'wpm_log')

    def validate(self, data):
        if data['password'] != data['re_password']:
            raise serializers.ValidationError('Passwords do not match.')
        return data

class CustomUserSerializer(UserSerializer):
    class Meta(UserSerializer.Meta):
        model = CustomUser
        fields = ('username', 'best_wpm', 'avg_wpm')

class GetUserWPMLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('wpm_log',)