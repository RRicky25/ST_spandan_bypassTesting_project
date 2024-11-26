from django.contrib import admin
from team.models import Team
from team.forms import TeamForm
# Register your models here.
class TeamAdmin(admin.ModelAdmin):
    form = TeamForm
# add teamAdmin below if you ant restrictions for admin too
admin.site.register(Team)
# admin.site.register(SportsMapping)