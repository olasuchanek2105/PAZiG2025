# from rest_framework.permissions import IsAuthenticated
# from rest_framework.decorators import api_view, permission_classes #jakie metody http beda obslugiwane przez ten widok
# from rest_framework.response import Response #obiekt odpowiedzi na zapytanie http
# from rest_framework import status, viewsets #zestAw kodow statusow
# from .serializers import OrderSerializer
# from .models import Orders
# from .serializers import OrderSerializer

# @api_view(['POST']) #obługuje tylko żadania post - do dodawania ogloszen
# @permission_classes([IsAuthenticated])
# def add_listing_api(request):
#     serializer = OrderSerializer(data=request.data)  
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data, status=status.HTTP_201_CREATED)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) #pętla sprawdzająca czy podane dane są prawidłowe

# class OrderViewSet(viewsets.ModelViewSet):
#     queryset = Orders.objects.all()
#     serializer_class = OrderSerializer

# listings/views.py

#ja przejrze ten kod u gory i zrobie z tym porzadek
from rest_framework import viewsets
from .models import Orders
from .serializers import OrderSerializer

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Orders.objects.all()  # Zwraca wszystkie obiekty Order
    serializer_class = OrderSerializer  # Używa serializera do walidacji i zapisu


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
