from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from .models import UserProfile
from django.core.files.base import ContentFile

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        blank_csv = 'time,wpm\n'
        profile = UserProfile(user=instance)
        profile.wpm_log.save(f'{instance.username}_log.csv', ContentFile(blank_csv))
        profile.save()