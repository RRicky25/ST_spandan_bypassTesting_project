from django.contrib import admin
from sports.models import Sports
from django.contrib.auth.admin import UserAdmin
from django.forms import TextInput, Textarea, CharField
from django import forms
from django.db import models

# Register your models here.

class SportsAdminConfig(admin.ModelAdmin):
    model = Sports
    search_fields = ('name', 'category') # for search bar

    list_filter=('category','max_team_size','min_team_size','min_males','min_females') # for filtering 
    list_display=('name','category','max_team_size','min_team_size','min_males','min_females') # for colums in table
admin.site.register(Sports,SportsAdminConfig) # sports for adding and admin config for table