from django.contrib import admin

# Register your models here.
from .models import CustomUser

@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    model = CustomUser
    list_display = ['username', 'email', 'best_wpm', 'avg_wpm']
    search_fields = ['username', 'email']
