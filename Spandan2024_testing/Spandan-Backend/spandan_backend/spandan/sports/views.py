# from django.shortcuts import render
# from rest_framework import generics
# from sports.models import Sports
# from .serializers import CustomSportsSerializer
# from rest_framework.permissions import AllowAny

# # Create your views here.
# class CreateSport(generics.CreateAPIView):
#     permission_classes = [AllowAny]

#     queryset = Sports.objects.all()
#     serializer_class = CustomSportsSerializer

# class GetSport(generics.RetrieveAPIView):
#     permission_classes = [AllowAny]

#     queryset = Sports.objects.all()
#     serializer_class = CustomSportsSerializer


# todo/todo_api/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from .models import Sports
from .serializers import CustomSportsSerializer

class SportsApiView(APIView):
    # add permission to check if user is authenticated
    permission_classes = [permissions.AllowAny]

    # 1. List all
    def get(self, request, *args, **kwargs):
        print(f'this is the request gained in sports : {request}')

        # unfiltered just for testing
        # sports = Sports.objects.all()
        # serializer = CustomSportsSerializer(sports, many=True)
        # return Response(serializer.data, status=status.HTTP_200_OK)

        sports = Sports.objects.filter(name = request.data.get('name'))
        serializer = CustomSportsSerializer(sports, many=True)
        print(serializer.data)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # 2. Create
    def post(self, request, *args, **kwargs):

        data = {
            'name': request.data.get('name'), 
            'category': request.data.get('category'), 
            'min_team_size': request.data.get('min_team_size'),
            'max_team_size': request.data.get('max_team_size'),
            'min_males': request.data.get('min_males'),
            'min_females': request.data.get('min_females'),
        }
        print(f'name is {data["name"]}')
        serializer = CustomSportsSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

""" Concrete View Classes
#CreateAPIView
Used for create-only endpoints.
#ListAPIView
Used for read-only endpoints to represent a collection of model instances.
#RetrieveAPIView
Used for read-only endpoints to represent a single model instance.
#DestroyAPIView
Used for delete-only endpoints for a single model instance.
#UpdateAPIView
Used for update-only endpoints for a single model instance.
##ListCreateAPIView
Used for read-write endpoints to represent a collection of model instances.
RetrieveUpdateAPIView
Used for read or update endpoints to represent a single model instance.
#RetrieveDestroyAPIView
Used for read or delete endpoints to represent a single model instance.
#RetrieveUpdateDestroyAPIView
Used for read-write-delete endpoints to represent a single model instance.
"""