from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views


router = DefaultRouter()
router.register(r'add', views.OrderViewSet)


urlpatterns = [
    path('', include(router.urls)),
    
]


#name = cos To nazwa tej ścieżki URL, której możesz używać w szablonach lub funkcji redirect().
