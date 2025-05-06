from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import OrderViewSet

router = DefaultRouter()
router.register(r'', OrderViewSet, basename='listings')



urlpatterns = [
    path('', include(router.urls)),
    path('api/', include('dj_rest_auth.urls')),
    
]


#name = cos To nazwa tej ścieżki URL, której możesz używać w szablonach lub funkcji redirect().
