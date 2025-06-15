from rest_framework import viewsets
from .models import Listing
from .serializers import ListingSerializer, CategorySerializer
from django.http import JsonResponse
from rest_framework import generics, permissions
from .models import Category
from rest_framework.permissions import BasePermission

class IsOwnerOrReadOnly(BasePermission):
    def has_object_permission(self, request, view, obj):
        # Odmów jeśli nie GET/HEAD/OPTIONS
        if request.method in ['GET', 'HEAD', 'OPTIONS']:
            return True
        # Zezwól tylko jeśli użytkownik jest właścicielem ogłoszenia
        return obj.user == request.user
class ListingViewSet(viewsets.ModelViewSet):
    queryset = Listing.objects.all()  # Zwraca wszystkie obiekty Listing
    serializer_class = ListingSerializer
    lookup_field = 'listing_id'

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        queryset = Listing.objects.all().order_by("-created_at")
        category = self.request.query_params.get("category")
        if category:
            queryset = queryset.filter(category__name__iexact=category)
        return queryset


        

        
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

class MyListingsView(generics.ListAPIView):
    serializer_class = ListingSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Listing.objects.filter(user=self.request.user).order_by('-created_at')

class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Listing
from .serializers import ListingSerializer
import random

@api_view(['GET'])
def random_listings(request):
    listings = list(Listing.objects.filter(status="Dostępne"))
    random.shuffle(listings)
    selected = listings[:5]
    serializer = ListingSerializer(selected, many=True, context={'request': request})
    return Response(serializer.data)



#post http://127.0.0.1:8000/api/listings/add/ 
#templatka do dodawania ogloszen
# {
# 	"order_id": "1",
#   "user_id":  1,
#   "category_id":  1,
#   "title": "kula",
#   "description": "fajna",
#   "price": 50.0,
#   "address": "gliwice",
#   "status": 1
# }

