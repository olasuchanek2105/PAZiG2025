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
    serializer_class = ListingSerializer  # Używa serializera do walidacji i zapisu
    # def get_object(self):
    #     return Listing.objects.get(listing_id=self.kwargs["pk"])
    lookup_field = 'listing_id'
    def perform_create(self, serializer):
        order = serializer.save(user=self.request.user)

        listing = order.listing
        listing.status = Listing.Status.SOLD 
        listing.save()
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

class MyListingsView(generics.ListAPIView):
    serializer_class = ListingSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Listing.objects.filter(user=self.request.user).order_by('-created_at')

class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer




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

