from django.db import models

# Create your models here.
class Sports(models.Model):
    options = (
        ('Football', 'Football'),
        ('Cricket', 'Cricket'),
        ('Basketball', 'Basketball'),
        ('Volleyball', 'Volleyball'),
        ('Throwball', 'Throwball'),
        ('Badminton', 'Badminton'),
        ('TableTennis','Table Tennis'),
        ('Tennis','Tennis'),
        ('NonMajor','Non Major Sport')
    )

    name = models.CharField(max_length=150, unique=True)
    category = models.CharField(max_length=150,choices=options,default='NonMajor')
    min_team_size = models.IntegerField()
    max_team_size = models.IntegerField()
    min_males = models.IntegerField()
    min_females = models.IntegerField()
    objects=models.Manager()
    def __str__(self):
        return self.name