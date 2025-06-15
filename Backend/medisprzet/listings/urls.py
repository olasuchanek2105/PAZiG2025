from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ListingViewSet, MyListingsView, CategoryListView
from .views import random_listings
router = DefaultRouter()
router.register(r'', ListingViewSet, basename='listings')



urlpatterns = [
    path('my-listings/', MyListingsView.as_view(), name='my-listings'),
    path('categories/', CategoryListView.as_view(), name='category-list'),
    path('', include(router.urls)),
    path('', include('dj_rest_auth.urls')),
    path('random/', random_listings, name='random-listings'),
]


#name = cos To nazwa tej ścieżki URL, której możesz używać w szablonach lub funkcji redirect().
