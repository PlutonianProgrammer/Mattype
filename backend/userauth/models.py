from django.contrib.auth.models import AbstractUser
from django.db import models

# # Create your models here.
# class UserProfile(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE)
#     wpm_log = models.FileField(upload_to='wpm_log/')
#     avg_wpm = models.FloatField()
#     best_wpm = models.FloatField()

#     def get_wpm_log(self):
#         #LOGIC NEEDED
#         return 'THIS WORKS'

class CustomUser(AbstractUser):
    email = models.EmailField(blank=True, null=True)

    avg_wpm = models.FloatField()
    best_wpm = models.FloatField()
    wpm_log_dates = models.

    USERNAME_FIELD = 'username'

    def __str__(self):
        return self.username