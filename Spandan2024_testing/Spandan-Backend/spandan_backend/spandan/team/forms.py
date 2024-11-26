from django import forms
from django.contrib.auth.models import User
from .models import Team
from users.models import NewUser
from django.core.exceptions import ValidationError
from django.http import JsonResponse
from rest_framework import status
from rest_framework.response import Response
from django.core.exceptions import NON_FIELD_ERRORS

class TeamForm(forms.ModelForm):
    members = forms.ModelMultipleChoiceField(queryset=NewUser.objects.all(), widget=forms.CheckboxSelectMultiple)

    class Meta:
        model = Team
        fields = '__all__'
        # error_messages = {
        #     NON_FIELD_ERRORS: {
        #         'unique_together': "%(model_name)s's %(field_labels)s are not unique.",
        #     }
        # }
    def clean(self):
            print("in clean")
        # try:
            members = self.cleaned_data.get('members')
            sport = self.cleaned_data.get('sport')
            team_size = self.cleaned_data.get('team_size')
            genders =[]
            if len(members)!=team_size:
                retst = "Given team size and members count donnt match "
                raise ValidationError(retst)
            print(members)
            for member in members:

                    genders.append(member.gender)
                    # print(genders)
                # try:
                    userr = NewUser.objects.get(id=member.id)
                    tteams = userr.teams.all()
                    # print(tteams)
                    MajorCat = set()
                    MinorCat = set()
                    inSportsNames = []
                    for tt in tteams:
                        if tt.sport.category != "NonMajor":
                            MajorCat.add(tt.sport.category)
                        else:
                            MinorCat.add(tt.sport.category)
                        inSportsNames.append(tt.sport.name)
                    print("hii")

                    if sport.category!="NonMajor" and sport.category not in MajorCat and len( MajorCat)>=4:
                        retst = "Given team member:"+ str(member.user_name)  +" is already in 4 teams "
                        print(retst)
                        raise forms.ValidationError(retst)

                    elif sport.category=="NonMajor" and len(MinorCat) >= 5:
                        retst = "Given team member:"+ str(member.user_name)  +" is already in 5 minor sports teams"
                        print(retst)
                        raise forms.ValidationError(retst)

                    print(sport.name,inSportsNames)
                    if sport.name in inSportsNames:
                        retst = "Given team member:"+ str(member.user_name) +" is already registered for this sport "
                        print(retst)

                        raise forms.ValidationError(retst)
                # except Exception as e:
                #     print(str(e))
                #     est = "error occured for {userr.name}:"+str(e)
                #     return Response(data={'error': est},status=status.HTTP_400_BAD_REQUEST)

            count_m = 0
            print("skip1")
            for g in genders:
                if g == 'm':
                    count_m+=1

            # if count_m < sport.min_males or (team_size - count_m)<sport.min_females:
            #     retst = "Given team needs to have min males:"+ str(sport.min_males)+", min females:"+str(sport.min_males)
            #     raise ValidationError(retst)
            return self.cleaned_data

        # except ValidationError as e:
        #     e = str(e)
        #     return Response(data={'message': "Validation error occured with {e}"},status=status.HTTP_400_BAD_REQUEST)

        #     # handle the validation error here

        # except Exception as e:
        #     return Response(data={'message': "An error occurred while cleaning: {e}"},status=status.HTTP_400_BAD_REQUEST)
        #     # handle the exception here

# def save(self, commit=True):
#     print("IN save")

#     try:
#         my_instance = super(TeamForm, self).save(commit=commit)
#         members = self.cleaned_data.get('members')
#         sport = self.cleaned_data.get('sport')

#         for member in members:
#             try:
#                 team = SportsMapping.objects.get(player = member.id)

#                 if sport.category!="NonMajor" and sport.category not in team.registeredTeams["MajorSports"]:
#                     team.registeredTeams["MajorSports"].append(sport.category)

#                 team.registeredTeams["SportsName"].append(sport.name)
#                 team.registeredTeams["Teams"].append({"sport_name":sport.name, "team_id":my_instance.id})
#                 team.save()

#             except SportsMapping.DoesNotExist as e:
#                 print(f"No team found for player {member.id}: {e}")
#                 # handle the exception here

#     except Exception as e:
#         print(f"An error occurred while saving: {e}")
#         # handle the exception here

#     return my_instance
