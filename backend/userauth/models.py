from django.db import models
from django.contrib.auth.models import AbstractUser

from datetime import datetime
import csv

# Create your models here
class CustomUser(AbstractUser):
    best_wpm = models.FloatField(default=0)
    avg_wpm = models.FloatField(default=0)
    wpm_log = models.FileField(upload_to='uploads/')

    def update_score_record(self, new_wpm):
        # Save best_wpm
        if self.best_wpm < new_wpm:
            self.best_wpm = new_wpm
        # Write new score to CSV
        now = datetime.now()
        day = now.strftime('%m-%d-%Y')
        with open (self.wpm_log.path, 'a', newline='') as log:
            writer = csv.writer(log)
            writer.writerow([day, new_wpm])
        # Recalculate avg wpm
        with open(self.wpm_log.path) as log:
            sum_of_wpm = 0
            count = 0
            reader = csv.DictReader(log)
            for row in reader:
                sum_of_wpm += float(row['wpm'])
                count += 1
            self.avg_wpm = sum_of_wpm / count

        self.save()
    
    def getDataOfGraph(self):
        all_days = []
        all_wpms = []
        with open(self.wpm_log.path) as log:
            reader = csv.DictReader(log)
            for row in reader:
                all_days.append(row['day'])
                all_wpms.append(float(row['wpm']))
        return (all_days, all_wpms)