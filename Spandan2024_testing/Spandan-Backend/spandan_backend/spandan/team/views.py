from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
from rest_framework import permissions
from .models import Team
from .serializers import TeamSerializer,SportsMappingSerializer
from .forms import TeamForm
from users.models import NewUser
from django.http import JsonResponse
from django.core.exceptions import ValidationError
from sports.models import Sports
from django.core.mail import send_mail  

class TeamAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get (self, request,*args,**kwags):
        # name = request.query_params['name']
        email = request.query_params['email']
        # tid = request.query_params['team_id']
        sname = request.query_params["sport_name"]
        # print(request.query_params['email'])
        # print(request)
        # if name:
        #     try:
        #         team = Team.objects.filter(name=name)
        #         serializer = TeamSerializer(team,many=True)
        #         return Response(serializer.data, status=status.HTTP_200_OK)
        #     except Exception as e:
        #         return Response(data={'error':str(e)},status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                
        if email:
            try:
                userr = NewUser.objects.get(email=email)
                tteams = userr.teams.all()
                print(tteams)
                if sname and sname != "all":
                    sp = Sports.objects.get(name = sname)
                    tteams = tteams.filter(sport=sp.id)
                serializer = TeamSerializer(tteams,many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Exception as e:
                return Response(data={'error':str(e)},status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        # elif tid:
        #     try:
        #         team = Team.objects.filter(id=tid)
        #         serializer = TeamSerializer(team,many=True)
        #         return Response(serializer.data, status=status.HTTP_200_OK)
        #     except Exception as e:
        #         return Response(data={'error':str(e)},status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        elif sname:
            try:
                sp = Sports.objects.get(name = sname)
                team = Team.objects.filter(sport=sp.id)
                serializer = TeamSerializer(team,many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Exception as e:
                return Response(data={'error':str(e)},status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response(data={'message': "no user id, team id, name,sport is found"},status=status.HTTP_400_BAD_REQUEST)
        
    def post (self, request,*args,**kwags):
        lis =[]
        spid = 87789876
        print(request.data)
        for mem in request.data.get('members'):
            print(mem)
            try:
                print(mem["rollNum"])
                idss = NewUser.objects.get(rollNum=mem["rollNum"])
                lis.append(idss.id)
            except Exception as e:
                rtst= "fetching user " + mem["name"] +" failed with error" + str(e)
                print(rtst)
                return Response(data={'error':rtst},status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        try:
            spt = Sports.objects.get(name=request.data.get("sports"))
            spid = spt.id
        except Exception as e:
                rtst= "fetching sport " + request.data.get("sports") +" failed with error" + str(e)
                print(rtst)

                return Response(data={'error':rtst},status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        data = {
            'name': request.data.get('name'),
            'sport': spid,
            'team_size': request.data.get('team_size'),
            'members':lis,
            'phoneNum':request.data.get('phoneNum')
        }
        print(data)

        form = TeamForm(data)

        serializer = TeamSerializer (data=data)
        # print("pre valid")
        # print(form.is_valid())
        if form.is_valid():

            print("validdd")
            print(form.errors)
            try :
                team = form.save()
                print(form.errors)

                print(team,"saved")
            except Exception as e:
                    print(str(e))
                    return Response(data={'error': e},status=status.HTTP_400_BAD_REQUEST)

            serializer = TeamSerializer(team)
            lis =[]
            lisNames = ""
            for playr in serializer.data["members"]:
                print(playr)

                print(playr['email'],type(playr['email']))
                lis.append(playr['email'])
                lisNames= lisNames + " "+playr['user_name']+","

            print(lis)
            emStr = "You have been added to team "+serializer.data["name"]+ " for sport "+serializer.data["sport"]["name"] + " with members" + lisNames[:-1]
            send_mail(
                # title:
                "Spandan 2024: {sport_name} Team Formation Update".format(title="Spandan 2024", sport_name=serializer.data["sport"]["name"]),
                # message:
                emStr,
                # from:
                settings.EMAIL_HOST_USER,
                # "mail_id",
                # to:
                lis
            )
            print("hello")
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print("!!!!!!!!",form.errors.as_json())
            return JsonResponse({'error': form.errors }, status=status.HTTP_400_BAD_REQUEST)

        # if serializer.is_valid():
        #     serializer.save()
        #     return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def delete(self, request):
        try:
            team = Team.objects.get(id=request.data.get('id'))
            # print()
            # if (len(team)==0):
            #     raise 
            serializer = TeamSerializer(team)
            listt = serializer.data['members']
            lisNames = ""

            team.delete()
            emails = []
            for p in listt:
                lisNames = lisNames + " " + p['user_name'] + ","
                emails.append(p['email'])
                
            emStr = "Your team has been deleted "+serializer.data["name"]+ " for "+serializer.data["sport"]["name"] + " with members" + lisNames[:-1]
            
            send_mail(
                "Spandan 2024: {sportname} Team Deletion Update".format(title = "Spandan 2024", sportname=serializer.data["sport"]["name"]),
                emStr,
                settings.EMAIL_HOST_USER,
                # "mail_id",
                emails
            )

            return Response(status=status.HTTP_204_NO_CONTENT)
        except Team.DoesNotExist:
            return Response(data={'message': "Team doesnt exist, give a proper team id"},status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR, data={'message': str(e)})

class SportsMappingAPIView (APIView):
    permission_classes = [permissions.AllowAny]

    def get (self, request,*args,**kwags):
        # json = SportsMapping.objects.get(player = request.data.get('user_id'))
        # print(json.registeredTeams["Teams"])
        # inTeams =[]
        # for team in json.registeredTeams["Teams"]:

        #         inTeams.append(team["team_id"])
        # print(inTeams)
        # team = Team.objects.filter(name = request.data.get('name'))
        userr = NewUser.objects.get(id=request.data.get('user_id'))
        tteams = userr.teams.all()
        serializer = TeamSerializer(tteams,many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


