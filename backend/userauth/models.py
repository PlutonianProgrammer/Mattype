from django.db import models
from django.contrib.auth.models import AbstractUser

from datetime import datetime
import csv

# Create your models here
class CustomUser(AbstractUser):
    best_wpm = models.FloatField(default=0)
    avg_wpm = models.FloatField(default=0)
    wpm_log = models.FileField(upload_to='uploads/')

    # These fields measure the accuracy of each key

    # Within last 10 tests
    last_ten_tests_mistakes = models.JSONField(default=list)
    last_ten_tests_char_count = models.JSONField(default=list)

    # Over lifetime
    lifetime_mistakes = models.JSONField(default=dict)
    lifetime_char_count = models.JSONField(default=dict)
    
    tracking_index = models.IntegerField(default=0)

    def update_score_record(self, new_wpm, mistakes, char_count):
        '''
        Docstring for update_score_record
        
        :param new_wpm: wpm calculated from most recent typing test
        :param mistakes: amount of mistakes for each char from most recent typing test
        :param char_count: total amount of char occurences from most recent typing test
        '''
        # Modify best_wpm field if necessary
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

        # Update data that stores key accuracy
        self.manageMistakeProfiles(mistakes, char_count)

        # Save model
        self.save()
    
    def manageMistakeProfiles(self, mistakes, char_count):
        '''
        Docstring for manageMistakeProfiles
        
        :param mistakes: mistakes made for each char from most recent typing test
        :param char_count: amount of occurences for each char from most recent typing test
        '''
        # If this is the first test, set the lifetime dictionaries to the ones given, as they are equivalent
        if (self.tracking_index == 0):
            self.lifetime_mistakes = mistakes
            self.lifetime_char_count = char_count

        # Otherwise, add all values from the given dicts to the lifetime dictionaries
        else:
            for key in self.lifetime_mistakes:
                self.lifetime_mistakes[key] += mistakes[key]
                self.lifetime_char_count[key] += char_count[key]

        # If-statement handles whether the last-10-tests-tracker should append or overwrite values
        if (self.tracking_index < 10):
            # Append, as there are less than 10 entries
            self.last_ten_tests_mistakes.append(mistakes) 
            self.last_ten_tests_char_count.append(char_count)
        else:
            # Overwrite oldest entry of last 10
            self.last_ten_tests_mistakes[self.tracking_index % 9] = mistakes
            self.last_ten_tests_char_count[self.tracking_index % 9] = char_count

        # % by 9 to get the oldest entry of the last 10
        self.tracking_index += 1
    
    def getDataOfGraph(self):
        '''
        Docstring for getDataOfGraph
        
        This will return the day and wpm of each typing test taken for this user.
        The resulting data is used as the x and y axis data of a graph sent to the frontend to track progress
        '''
        all_days = []
        all_wpms = []
        with open(self.wpm_log.path) as log:
            reader = csv.DictReader(log)
            for row in reader:
                all_days.append(row['day'])
                all_wpms.append(float(row['wpm']))
        return (all_days, all_wpms)