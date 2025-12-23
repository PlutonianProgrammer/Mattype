from django.contrib import admin
from .models import CustomUser
# Register your models here.

@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'best_wpm', 'avg_wpm', 'last_ten_tests_mistakes', 'tracking_index')