from rest_framework import serializers
from .models import Listing 
class ListingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Listing
        fields = '__all__' #wszystkie pola z tabeli orders
        read_only_fields = ['listing_id']
