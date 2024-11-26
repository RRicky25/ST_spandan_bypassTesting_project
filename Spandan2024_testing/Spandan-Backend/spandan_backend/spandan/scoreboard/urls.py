from django.urls import path
from .views import ScoreboardApiView
app_name = "scoreboard"

urlpatterns = [
    path('', ScoreboardApiView.as_view(), name="scoreboardurls")
]




# to do:
""" 
GET checklist
- check the get for scoreboards
- verify filter by sport and round

POST checklist
- Posting with correct and valid inputs
- Incorrect inputs handling  - Improve serializer
- Generate meaningfull errors


checks in post:
- same team names for team1 and team2
- handling team1 and team2 names given in reverse order
"""