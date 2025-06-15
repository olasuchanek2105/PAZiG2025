from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet


router = DefaultRouter()
router.register(r'', UserViewSet)  


urlpatterns = [
    path('', include('dj_rest_auth.urls')),  # /api/auth/login/, logout, password reset itd.
    path('/registration', include('dj_rest_auth.registration.urls')),  # /api/auth/registration/
    path('', include(router.urls)),  # np. /api/users/
    
]

#endpointy do uzycia:
# /login
# /logout
# /singup
# /password_reset
# /password_change