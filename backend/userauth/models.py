from django.db import models
from django.contrib.auth.models import AbstractUser

from datetime import datetime
import csv

# Create your models here
class CustomUser(AbstractUser):
    best_wpm = models.FloatField(default=0)
    avg_wpm = models.FloatField(default=0)
    wpm_log = models.FileField(upload_to='uploads/')

    last_ten_tests_mistakes = models.JSONField(default=list)
    tracking_index = models.IntegerField(default=0)

    lifetime_total_mistakes = models.JSONField(default=dict)

    def update_score_record(self, new_wpm, mistakes):
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

        self.manageMistakeProfiles(mistakes)
        self.save()
    
    def manageMistakeProfiles(self, mistakes):

        if (self.tracking_index == 0):
            self.lifetime_total_mistakes = mistakes
        else:
            for key in self.lifetime_total_mistakes:
                self.lifetime_total_mistakes[key] += mistakes[key]

        if (self.tracking_index < 10):
            self.last_ten_tests_mistakes.append(mistakes) 
        else:
            self.last_ten_tests_mistakes[self.tracking_index % 9] = mistakes

        self.tracking_index += 1
    
    def getDataOfGraph(self):
        all_days = []
        all_wpms = []
        with open(self.wpm_log.path) as log:
            reader = csv.DictReader(log)
            for row in reader:
                all_days.append(row['day'])
                all_wpms.append(float(row['wpm']))
        return (all_days, all_wpms)