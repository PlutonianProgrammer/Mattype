from django.contrib.auth.models import User
from django.db import models

# Create your models here.
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    wpm_log = models.FileField(upload_to='wpm_log/')

    def get_wpm_log(self):
        #LOGIC NEEDED
        return 'THIS WORKS'