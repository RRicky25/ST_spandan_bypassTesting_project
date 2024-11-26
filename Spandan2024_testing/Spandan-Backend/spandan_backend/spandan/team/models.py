from django.db import models
from sports.models import Sports
from users.models import NewUser
from rest_framework.response import Response
from rest_framework import status
from django.core.exceptions import ValidationError


# import jsonfield

# Create your models here.
class Team (models.Model):
    name = models.CharField(max_length=150)
    sport = models.ForeignKey(Sports,on_delete=models.CASCADE,null=True, blank=True)
    team_size = models.IntegerField()
    members = models.ManyToManyField(NewUser,related_name="teams")
    phoneNum = models.CharField(max_length=150)
    # object = models.manager()
    def __str__(self):
        return self.name
    class Meta:
        unique_together = [['name','sport']]
        
    def save (self, *args, **kwargs):
        try:
            print("hii")
            if self.team_size < self.sport.min_team_size or self.team_size>self.sport.max_team_size:
                raise ValueError(f"Team of '{self.sport.name}' can have '{self.sport.min_team_size}' to '{self.sport.max_team_size}' members, given size is {self.team_size}  ")
                print("erororooror team size")
            super().save(*args, **kwargs)
        except ValidationError as e:
            # if the validation error is due to unique_together constraint
            print("@@@@@@@@@@@@@@@@@@@",e)
            if 'unique' in e.message_dict:
                print("iiiiiiiiiiii")
                raise ValidationError({'error': 'A team with this name and sport already exists.'})
            else:
                raise ValidationError({'error': e.message})
        except Exception as e:
            # if the validation error is due to unique_together constraint
            # print("@@@@@@@@@@@@@@@@@@@",e)
            # if 'UNIQUE constraint failed' in e:
            #     print("iiiiiiiiiiii")
                raise ValidationError(e)

# class SportsMapping(models.Model):
#     player = models.ForeignKey(NewUser,on_delete=models.CASCADE,unique=True)
#     registeredTeams = models.JSONField()

#     def __str__(self):
#         return self.player.user_name