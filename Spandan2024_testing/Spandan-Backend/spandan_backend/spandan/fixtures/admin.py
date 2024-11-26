from django.contrib import admin
from .models import Fixture
from django.contrib.auth.admin import UserAdmin
# Register your models here.

class FixtureAdminConfig(admin.ModelAdmin):
    model = Fixture
    search_fields = ('sport', 'team1','team2') # for search bar

    list_filter = ('sport', 'team1','team2') # for filtering 
    list_display = ('sport', 'team1','team2') # for colums in table
admin.site.register(Fixture,FixtureAdminConfig)