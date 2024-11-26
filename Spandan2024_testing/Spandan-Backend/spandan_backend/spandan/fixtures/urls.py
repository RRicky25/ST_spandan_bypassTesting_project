from django.urls import path
from .views import FixtureAPIView

app_name = 'fixtures'

urlpatterns = [
    path ('',FixtureAPIView.as_view(),name='fixtureurls')
]