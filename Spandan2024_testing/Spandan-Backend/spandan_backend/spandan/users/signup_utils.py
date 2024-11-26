from django.conf import settings
from django.core.mail import send_mail
from django.core.cache import cache
import string
import random


def generate_otp(length):
    characters = string.digits
    otp = ''.join(random.choice(characters) for _ in range(length))
    return otp


def send_otp(email, otp):
    try:
        subject = 'Your OTP for Signup in Spandan'
        message = f'Your OTP is: {otp}'
        from_email = settings.EMAIL_HOST_USER
        recipient_list = [email]
        send_mail(subject, message, from_email, recipient_list)
        return True
    except Exception as e:
        # Log the error or handle it accordingly
        print(f"Error sending OTP email: {e}")
        return False



def cache_otp_verification_data(email, otp, timeout = 180):
    otp_verification_data = otp
    cache.set(email, otp, timeout = timeout)
    return otp_verification_data