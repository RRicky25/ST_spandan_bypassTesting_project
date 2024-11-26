from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from .models import Fixture
from .serializers import CustomFixtureSerializer
from django.http import JsonResponse
from django.core.exceptions import ValidationError
from django.db.models import Q

class FixtureAPIView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, *args, **kwargs):
        id = request.data.get('id')
        sport = request.data.get('sport')
        team_id = request.data.get('team_id')
        # isStarted = request.data.get('isStarted')
        # current_time = datetime.now()
        if id:
            print("id",id)

            try:
                fixture = Fixture.objects.get(id=id)
                serializer = CustomFixtureSerializer(fixture)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Fixture.DoesNotExist:
                return Response(data={'message': "Fixture doesnt exist, give a proper fixture id"},status=status.HTTP_404_NOT_FOUND)
        elif sport:
            print("ss",sport)
            try:
                fixtures = Fixture.objects.filter(sport=sport)
                serializer = CustomFixtureSerializer(fixtures, many=True)
                # if isStarted:
                #     fixtures = fixtures.filter(start_time__gte=current_time)

                return Response(serializer.data, status=status.HTTP_200_OK)
            except Fixture.DoesNotExist:
                return Response(data={'message': "Fixture doesnt exist, give a proper sport name"},status=status.HTTP_404_NOT_FOUND)
        elif team_id:
            print("Tttt",team_id)
            try:
                queryset = Fixture.objects.filter(Q(team1=team_id) | Q(team2=team_id))
                # fixtures = Fixture.objects.get(team1=team_id)
                print(queryset)
                serializer = CustomFixtureSerializer(queryset, many=True)
                # if isStarted:
                #     fixtures = fixtures.filter(start_time__gte=current_time)

                return Response(serializer.data, status=status.HTTP_200_OK)
            except Fixture.DoesNotExist:
                return Response(data={'message': "Fixture doesnt exist, give a proper sport name"},status=status.HTTP_404_NOT_FOUND)

        else:
            print(all)
            try:
                fixtures = Fixture.objects.all()
                serializer = CustomFixtureSerializer(fixtures, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Fixture.DoesNotExist:
                return Response(data={'message': "Fixture doesnt exist, give a proper sport name"},status=status.HTTP_404_NOT_FOUND)

    def post (self, request,*args,**kwags):
        try:
            print(request.data)
            serializer = CustomFixtureSerializer(data=request.data)
            print (serializer)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
                return Response(data={'message':str(e)},status=status.HTTP_404_NOT_FOUND)

    def delete(self, request):
        try:
            fixx = Fixture.objects.get(id=request.data.get('id'))
            fixx.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Fixture.DoesNotExist:
            return Response(data={'message': "Fixture doesnt exist, give a proper Fixture id"},status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR, data={'message': str(e)})
