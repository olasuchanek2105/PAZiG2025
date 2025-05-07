from rest_framework import viewsets
from .models import Listing
from .serializers import ListingSerializer
from django.http import JsonResponse


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Listing.objects.all()  # Zwraca wszystkie obiekty Order
    serializer_class = ListingSerializer  # Używa serializera do walidacji i zapisu


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

#get http://127.0.0.1:8000/api/listings/add/
