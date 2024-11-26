from rest_framework import serializers
from team.models import Team
from sports.serializers import CustomSportsSerializer
class TeamSerializer(serializers.ModelSerializer):
    def validate(self, data):
        # print(Team.sport)
        instance = Team()
        instance.clean()
        # if data['team_size'] != len(set(data['members'])):
        #     print("ADSgf")
        #     raise serializers.ValidationError("Given team size doesnt match with members")
        # print("hiiserialll")
        return data
    class Meta:
        model = Team
        fields = '__all__'
        depth =1 
    def to_representation(self, instance):
        self.fields['sport'] =  CustomSportsSerializer(read_only=True)
        return super(TeamSerializer, self).to_representation(instance)

class SportsMappingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = '__all__'
