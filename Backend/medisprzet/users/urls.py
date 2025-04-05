from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet


router = DefaultRouter()
router.register(r'', UserViewSet)  # 👈 Zamiast 'users'


urlpatterns = [
    path('auth/', include('dj_rest_auth.urls')),                    # login, logout, password reset
    path('auth/registration/', include('dj_rest_auth.registration.urls')),  # rejestracja
    path('', include(router.urls)),
]

#endpointy do uzycia:
# /login
# /logout
# /singup
# /password_reset
# /password_change