from django.shortcuts import render
from rest_framework import viewsets
from django.contrib.auth.models import User
from .serializers import UserSerializer
# Create your views here.

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


# `ModelViewSet` to klasa, która **automatycznie tworzy gotowe endpointy

# - `GET /api/users/` – lista użytkowników
# - `GET /api/users/1/` – jeden użytkownik
# - `POST /api/users/` – dodaj nowego użytkownika
# - `PUT /api/users/1/` – edytuj użytkownika
# - `DELETE /api/users/1/` – usuń użytkownika


# serializer_class = UserSerializer
# 1. React (lub przeglądarka) wyśle zapytanie na adres `http://localhost:8000/api/users/`
# 2. `UserViewSet`:
#    - pobierze dane z bazy (`queryset`)
#    - użyje `UserSerializer`, by zamienić dane na JSON
#    - odeśle odpowiedź
