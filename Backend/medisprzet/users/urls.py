from django.urls import path, include

urlpatterns = [
    path('accounts/', include('allauth.urls')) #przekierowuje sciezki /accounts/ do allauth
    #include allauth automatycznie dodaje gotowe widoki rejestracji itp
]

#endpointy do uzycia:
# /login
# /logout
# /singup
# /password_reset
# /password_change