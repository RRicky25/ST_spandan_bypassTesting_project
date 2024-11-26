from rest_framework import serializers
from scoreboard.models import Scoreboard
from sports.serializers import CustomSportsSerializer
from team.serializers import TeamSerializer
from sports.models import Sports

class CustomScoreboardSerializer(serializers.ModelSerializer):

    #  Define a read-only field for the sport name
    sport_name = serializers.SerializerMethodField()

    class Meta:
        model = Scoreboard
        fields = '__all__' 


    # This get method will be directly used by django to fill the sport_name field which was created above
    def get_sport_name(self, obj):
        return obj.sport.name


    def to_representation(self, instance):
        representation = super(CustomScoreboardSerializer, self).to_representation(instance)

        team1_serializer = TeamSerializer(instance.team1, context = self.context)
        team2_serializer = TeamSerializer(instance.team2, context = self.context)

        # There is no need to send the whole data about the sport instead the sport name is sufficient
        representation.pop('sport')
        # representation['sport_name'] = instance.sport.name

        # Further serialize the teams data as the individual team's data can be used in frontend
        representation['team1'] = team1_serializer.data
        representation['team2'] = team2_serializer.data

        return representation
