from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import CustomUserSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny,BasePermission
from django.contrib.sessions.models import Session
from django.contrib.sessions.backends.db import SessionStore
from django.core.mail import send_mail  
from django_otp import devices_for_user
from django_rest_passwordreset.tokens import get_token_generator
from django.template.loader import render_to_string
from django.conf import settings
from django.core.exceptions import ObjectDoesNotExist
from django.urls import reverse
from django_rest_passwordreset.tokens import get_token_generator
from django.template.loader import render_to_string
from django.conf import settings
from .models import NewUser
from django_otp.oath import TOTP
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
import random
import string
from django.core.cache import cache
from .signup_utils import *

# Imports for generating tokens in the singup part
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication



# class IsEmailVerified(BasePermission):
#     def has_permission(self, request, view):
#         return request.user.is_authenticated and request.user.is_email_verified




class CustomOtpVerifiy_userCreate(APIView):
    permission_classes = [AllowAny]
    authentication_classes = ()

    def post(self, request):
        try:

            serializer = CustomUserSerializer(data=request.data)
            if serializer.is_valid():    
                email = request.data.get('email')
                otp_sent = cache.get(email)
                otp_recieved = request.data.get('otp')
                # print(f'otp sent : {otp_sent} and otp_recieved : {otp_recieved}')

                if not otp_recieved:
                    cache.delete(email)
                    return Response({'error': 'OTP not sent and hence verification failed'}, status=status.HTTP_400_BAD_REQUEST)

                if otp_sent is None:
                    return Response({'error': 'OTP expired please try again'}, status=status.HTTP_400_BAD_REQUEST)
                
                if otp_sent != otp_recieved:
                    cache.delete(email)
                    return Response({'error': 'OTP did not match verification failed'}, status=status.HTTP_400_BAD_REQUEST)
                
                
                cache.delete(email)
                if NewUser.objects.filter(email=email).exists():
                    return Response({'error': 'Email address already registered'}, status=status.HTTP_400_BAD_REQUEST)
                
                if NewUser.objects.filter(rollNum = serializer.validated_data['rollNum']).exists():
                    return Response({'error': 'Roll number already registered'}, status=status.HTTP_400_BAD_REQUEST)
                                    

                user = NewUser(**(serializer.data))
                password = request.data.get('password')
                if not password:
                    return Response({'error': 'User not created as password was not sent'}, status=status.HTTP_400_BAD_REQUEST)
                user.set_password(request.data.get('password'))
                user.is_active = True
                user.save()

                # generate tokens for the user
                response_data = serializer.data
                token_serializer = TokenObtainPairSerializer(data={"email": email, "password": password})
                if token_serializer.is_valid():
                    tokens = token_serializer.validated_data
                    access_token = tokens['access']
                    refresh_token = tokens['refresh']
                    response_data['access_token'] = access_token
                    response_data['refresh_token'] = refresh_token

                return Response(response_data, status=status.HTTP_200_OK)
                
        except Exception as e:
            print(e)
            return Response({'error': 'Internal server error.please try again'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            

class GetUser(APIView):
    permission_classes = [AllowAny]
    authentication_classes = ()
    def get(self,request,format = 'json'):
        from rest_framework_simplejwt.backends import TokenBackend
        from django.contrib.auth import get_user_model

        roll_Num = request.query_params['rollNum']
                
        try:
            userr = NewUser.objects.get(rollNum=roll_Num)
            serializer = CustomUserSerializer(userr)
            return Response(serializer.data,status = status.HTTP_200_OK)
        
        except ObjectDoesNotExist:
            return Response({'error': 'User with this Roll Number does not exist'}, status=status.HTTP_404_NOT_FOUND)
        
        except Exception as e:
            print(e)
            return Response(data={'error':str(e)},status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        


class CustomUserCreate(APIView):
    permission_classes = [AllowAny]
    authentication_classes = ()

    def post(self, request):
        try:
            # serializer = CustomUserSerializer(data=request.data)
            # if serializer.is_valid():
                
                # check if the email is already registered or not and the availabitlit of password in request
                email = request.data.get('email')
                if NewUser.objects.filter(email=email).exists():
                    return Response({'error': 'Email address already registered'}, status=status.HTTP_400_BAD_REQUEST)
                
                # create the otp
                otp = generate_otp(6)

                # store the userdata,password and otp somewhere temporarily for future otp verification
                otp_verification_data = cache_otp_verification_data(email, otp)

                # Send the otp
                if not send_otp(email, otp):
                    return Response({'error': 'Failed to send OTP email. Please try again later.'},
                                status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                
                return Response({'message' : "Otp has been sent to you"}, status=status.HTTP_200_OK)
            

        except Exception as e:
            print(f"Error in signup process: {e}")
            return Response({'error': 'An unexpected error occurred. Please try again later.'},
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR)


    def get(self,request,format = 'json'):
        from rest_framework_simplejwt.backends import TokenBackend
        from django.contrib.auth import get_user_model

        email = request.query_params['email']
                
        try:
            userr = NewUser.objects.get(email=email)
            serializer = CustomUserSerializer(userr)
            return Response(serializer.data,status = status.HTTP_200_OK)
        
        except ObjectDoesNotExist:
            return Response({'error': 'User with this email does not exist'}, status=status.HTTP_404_NOT_FOUND)
        
        except Exception as e:
            print(e)
            return Response(data={'error':str(e)},status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    
    # Was created for testing and should not be availble to the users.
    # def delete(self, request):
    #     try:
    #         print("hello I am in delete")
    #         email = request.data.get('email')
    #         user = NewUser.objects.get(email=email)
    #         user.delete()
    #         return Response({'message': 'User deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
    #     except NewUser.DoesNotExist:
    #         return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
    #     except Exception as e:
    #         return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            


class BlacklistTokenUpdateView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = ()

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)