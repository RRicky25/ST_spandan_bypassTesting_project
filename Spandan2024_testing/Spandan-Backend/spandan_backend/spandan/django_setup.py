import os
from django.conf import settings

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'spandan.settings')  # Replace 'your_project_name' with your actual Django project name

# Call django.setup() to load Django settings
import django
django.setup()
