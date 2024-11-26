from rest_framework import serializers
from sports.models import Sports

class CustomSportsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sports
        fields = '__all__'
