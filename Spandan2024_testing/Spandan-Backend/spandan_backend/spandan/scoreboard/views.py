from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from .models import Scoreboard
from sports.models import Sports
from team.models import Team
from .serializers import CustomScoreboardSerializer

class ScoreboardApiView(APIView):

    # add custom permissions for get and post methods to check if user authentication is required or not.
    # post needs authentication as this will be used by spoc to update the scoreboard and hence authentication is required here.
    def get_permissions(self):
        if self.request.method == 'GET':
            return [permissions.AllowAny()]
        elif self.request.method == 'POST':
            return [permissions.AllowAny()]
            # return [permissions.IsAuthenticated()]
        else:
            return [permissions.AllowAny()]  # Default permission

    
    def get(self, request):
        try :
            sport_name = request.data.get('name')
            round_num = request.data.get('round')
            sp = Sports.objects.get(name = sport_name)
            scoreboards = Scoreboard.objects.filter(sport = sp.id, round_num = round_num)

            serializer = CustomScoreboardSerializer(scoreboards, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except Sports.DoesNotExist:
            return Response(data={'error': 'Requested sport does not exist'}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response(data={'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        


    def post(self, request):
        try:
            sname = request.data.get('s_name')
            sid = Sports.objects.get(name = sname).pk
            t1_name = request.data.get('t1_name')
            team1= Team.objects.get(name = t1_name, sport = sid)
            t2_name = request.data.get('t2_name')
            team2 = Team.objects.get(name = t2_name, sport = sid)

            data = {
                'sport': sid,
                'team1': team1.pk,
                'team2': team2.pk,
                'set_score': request.data.get('set_score'),
                'round_num': request.data.get('round_num')
            }

            print(f"The data is : {data}")

            serializer = CustomScoreboardSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
            
        except (Sports.DoesNotExist, Team.DoesNotExist) as e:
            return Response(data={'error': str(e)}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response(data={'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    
    def delete(self, request):
        try :
            sport_name = request.data.get('sport_name')
            round_num = request.data.get('round')
            team1_name = request.data.get('team1_name')
            team2_name = request.data.get('team2_name')

            sport = Sports.objects.get(name = sport_name)
            team1 = Team.objects.get(name = team1_name, sport = sport.pk)
            team2 = Team.objects.get(name = team2_name, sport = sport.pk)

            scoreboard = Scoreboard.objects.get(sport = sport.pk, round_num = round_num, team1 = team1.pk, team2 = team2.pk)
            # serializer = CustomScoreboardSerializer(scoreboard)
            
            scoreboard.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        

        except Sports.DoesNotExist as e:
            return Response(data={'message': "Sport doesnt exist, give a proper sport name"},status=status.HTTP_404_NOT_FOUND)
        
        except Team.DoesNotExist as e:
            return Response(data={'message': "Team doesnt exist, give a team name which is registered for the given sport name"},status=status.HTTP_404_NOT_FOUND)
        
        except Scoreboard.DoesNotExist as e:
            return Response(data={'message': "No scoreboard for the given inputs found"},status=status.HTTP_404_NOT_FOUND)
        
        except Exception as e:
            return Response(data={'message': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    


        
