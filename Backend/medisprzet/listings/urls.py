from django.urls import path
from .views import add_listing_api

urlpatterns = [
    path('add/', add_listing_api, name='add_listing_api'),
]


#name = cos To nazwa tej ścieżki URL, której możesz używać w szablonach lub funkcji redirect().
