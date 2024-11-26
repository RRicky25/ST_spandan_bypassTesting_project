from django.urls import path
from .views import TeamAPIView,SportsMappingAPIView
app_name = "team"

urlpatterns = [
    path('',TeamAPIView.as_view(),name="teamurls"),
    path('userMapping',SportsMappingAPIView.as_view(),name='userMappingUrls')
]