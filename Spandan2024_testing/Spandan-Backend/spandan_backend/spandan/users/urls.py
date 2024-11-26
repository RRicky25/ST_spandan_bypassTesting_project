from django.urls import path
from .views import CustomUserCreate, BlacklistTokenUpdateView, CustomOtpVerifiy_userCreate,GetUser

app_name = 'users'

urlpatterns = [
    path('create/', CustomUserCreate.as_view(), name="create_user"),
    path('getuserbyroll/', GetUser.as_view(), name="get_user"),
    path('otp/verify/', CustomOtpVerifiy_userCreate.as_view(), name="verify_otp"),
    path('logout/blacklist/', BlacklistTokenUpdateView.as_view(),
         name='blacklist')
]