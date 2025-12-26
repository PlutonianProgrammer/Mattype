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
    last_ten_tests_word_count = models.JSONField(default=list)

    lifetime_mistakes = models.JSONField(default=dict)
    lifetime_word_count = models.JSONField(default=dict)
    
    tracking_index = models.IntegerField(default=0)

    def update_score_record(self, new_wpm, mistakes, word_count):

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

        # Keep track of mistakes made and what correct chars would be
        self.manageMistakeProfiles(mistakes, word_count)

        # Save model
        self.save()
    
    def manageMistakeProfiles(self, mistakes, word_count):

        # If this is the first test, set the lifetime dictionaries to the ones given, as they are equivalent
        if (self.tracking_index == 0):
            self.lifetime_mistakes = mistakes
            self.lifetime_total_word_count = word_count

        # Otherwise, add all values from the given dicts to the lifetime dictionaries
        else:
            for key in self.lifetime_total_mistakes:
                self.lifetime_mistakes[key] += mistakes[key]
                self.lifetime_word_count[key] += word_count[key]

        # If-statement handles whether the last-10-tests-tracker should append or overwrite values
        if (self.tracking_index < 10):
            # Append, as there are less than 10 entries
            self.last_ten_tests_mistakes.append(mistakes) 
            self.last_ten_tests_word_count.append(word_count)
        else:
            # Overwrite oldest entry of last 10
            self.last_ten_tests_mistakes[self.tracking_index % 9] = mistakes
            self.last_ten_tests_word_count[self.tracking_index % 9] = word_count

        # % by 9 to get the oldest entry of the last 10
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