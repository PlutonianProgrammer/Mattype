from .models import CustomUser
from django.dispatch import receiver
from django.db.models.signals import post_save
from django.core.files.base import ContentFile

@receiver(post_save, sender=CustomUser)
def create_default_file(sender, instance, created, **kwargs):
    if created and not instance.profile_file:
        name = f'{instance.username}.csv'
        content = 'day, wpm\n'
        instance.wpm_log.save(name, ContentFile(content.encode('utf-8')))
    else:

        # Save to DB
        instance.save()