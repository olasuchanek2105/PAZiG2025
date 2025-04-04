from django.urls import path, include
from . import views

urlpatterns = [
    path('add/', views.add_listings, name='add_listings'),
    # path('<int:id>/', views.listing.detail, name='listing_detail'),
    # path('', views.listing_list, name='listing_list'),
]