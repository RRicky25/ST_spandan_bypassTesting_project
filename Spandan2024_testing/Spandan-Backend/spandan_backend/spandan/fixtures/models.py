from django.db import models
from team.models import Team
from django.utils import timezone
from sports.models import Sports
# Create your models here.

class Fixture (models.Model):
    options = (
        ('Round1', 'Round1'),
        ('Round2', 'Round2'),
        ('Round3', 'Round3'),
        ('Quaters', 'Quaters'),
        ('Semis', 'Semis'),
        ('Finals', 'Finals')
    )
    start_time = models.DateTimeField(default=timezone.now)
    round = models.CharField(max_length=150,choices=options,default='Round1')
    team1 = models.ForeignKey(Team, on_delete=models.CASCADE,related_name='fixtures_as_team1') # have to decide on_delete option
    team2 = models.ForeignKey(Team,on_delete=models.CASCADE, related_name='fixtures_as_team2')
    sport = models.ForeignKey(Sports,on_delete=models.CASCADE,related_name='fixtures_as_sport')
    class Meta:
        unique_together = [['round','team1'],['round','team2']]
    
    def __str__(self):
        return self.sport.name + self.team1.name +"  VS  "+self.team2.name
    
    def save (self, *args, **kwargs):

        if self.team1.sport != self.team2.sport or self.team1.sport!=self.sport:
            raise ValueError(f"Team of {self.team1} of:'{self.team1.sport}' cannot be fixed with{self.team1} of:'{self.team2.sport}' for category {self.sport}")
        super().save(*args, **kwargs)
