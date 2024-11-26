from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.dispatch import receiver
from django.urls import reverse
from django_rest_passwordreset.signals import reset_password_token_created
from django.core.mail import send_mail  
from django_rest_passwordreset.tokens import get_token_generator
from django.template.loader import render_to_string
from django.conf import settings
from django.conf import settings


class CustomAccountManager(BaseUserManager):

    def create_superuser(self, email, user_name, first_name, password,rollNum, **other_fields):

        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', True)
        other_fields.setdefault('is_active', True)

        if other_fields.get('is_staff') is not True:
            raise ValueError(
                'Superuser must be assigned to is_staff=True.')
        if other_fields.get('is_superuser') is not True:
            raise ValueError(
                'Superuser must be assigned to is_superuser=True.')

        return self.create_user(email, user_name, first_name, password,rollNum, **other_fields)

    def create_user(self, email, user_name, first_name, password,rollNum,**other_fields):
        print("iuhadguiadsgiuhaiusdghiu")
        print(rollNum)
        if not email:
            raise ValueError(_('You must provide an email address'))

        email = self.normalize_email(email)
        user = self.model(email=email, user_name=user_name,
                          first_name=first_name,rollNum = rollNum, **other_fields)
        user.set_password(password)
        user.save()

        return user


class NewUser(AbstractBaseUser, PermissionsMixin):
    options = (('m','Male'),('f','Female'))
    email = models.EmailField(_('email address'), unique=True)
    user_name = models.CharField(max_length=150, unique=True)
    first_name = models.CharField(max_length=150, blank=True)
    start_date = models.DateTimeField(default=timezone.now)
    about = models.TextField(_(
        'about'), max_length=500, blank=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)
    rollNum = models.CharField(max_length=150,unique=True)
    gender = models.CharField(max_length=10,choices=options,default='m')
    objects = CustomAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['user_name', 'first_name','rollNum']

    def __str__(self):
        return self.user_name


@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):
    print("helllo -------------------------------------------------------")
    print(reset_password_token.user.user_name)
    print("helllo -------------------------------------------------------")
    # print(sender)
    # print(reset_password_token.user.user_name)
    email_plaintext_message = " Hi, "+ reset_password_token.user.user_name +" as requested, we have generated a token for resetting credentials. Follow this URL to proceed ahead http://localhost:3000/change/{}".format(reset_password_token.key)

    send_mail(
        # title:
        "Spandan 2023: Login steps ahead for {}".format(reset_password_token.user.user_name),
        # message:
        email_plaintext_message,
        # from:
        settings.EMAIL_HOST_USER,
        # "mail_id",
        # to:
        [reset_password_token.user.email]
    )