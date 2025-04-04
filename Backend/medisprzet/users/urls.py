from django.urls import path, include

urlpatterns = [
    path('auth/', include('dj_rest_auth.urls')),                    # login, logout, password reset
    path('auth/registration/', include('dj_rest_auth.registration.urls')),  # rejestracja
]

#endpointy do uzycia:
# /login
# /logout
# /singup
# /password_reset
# /password_change