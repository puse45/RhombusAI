#!/bin/sh
python manage.py migrate
python manage.py collectstatic --no-input --clear
python manage.py shell -c "
from django.contrib.auth import get_user_model;
try:
  get_user_model().objects.filter(email='admin@admin.com').exists() or get_user_model().objects.create_superuser(username='admin',email='admin@admin.com',password='admin')
except Exception as e:
  print(e)
  "
exec "$@"
