from django.db import models
from sports.models import Sports
from team.models import Team
from rest_framework.response import Response
from rest_framework import status
from django.core.exceptions import ValidationError

# Create your models here.

class Scoreboard (models.Model):

    sport = models.ForeignKey(Sports, on_delete=models.CASCADE, related_name='scoreboards')
    team1 = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='team1_scores')
    team2 = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='team2_scores')
    set_score = models.CharField(max_length=50)
    round_num = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.sport.name} - Round {self.round_num}: {self.team1.name} vs {self.team2.name} : {self.set_score}"
    

    # Bug : primary keys also considers sequence of team1 and team2 names. So if only names are passed in reverse order then the uniqueness can be bypassed.
    class Meta:
        unique_together = ('team1','team2', 'sport', 'round_num')
