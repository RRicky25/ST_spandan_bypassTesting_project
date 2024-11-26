from rest_framework import serializers
from .models import Fixture

class CustomFixtureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fixture
        fields = '__all__'
        depth =1 

