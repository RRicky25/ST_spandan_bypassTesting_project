from django.urls import path
# from .views import CreateSport,GetSport
from .views import SportsApiView
app_name = 'sports'

urlpatterns = [
    # path('create/', CreateSport.as_view(), name="create_sport"),
    # path('<str:name>/', GetSport.as_view(), name="get_sport")
    path ('',SportsApiView.as_view(),name='sporturls')
]