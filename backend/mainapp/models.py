from django.db import models

# Create your models here.
class User(models.Model):
    name = models.TextField(max_length=20)
    bestWPM = models.FloatField()
    avgWPM = models.FloatField()
    placement = models.IntegerField()

    def __str__(self):
        return self.name