from rest_framework import serializers
from .models import Order

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        
        fields = ['id', 'listing', 'name', 'phone', 'email', 'street', 'city', 'postal_code', 'notes', 'created_at']
        read_only_fields = ['id', 'created_at', 'user']

    def create(self, validated_data):
        user = self.context['request'].user
        return Order.objects.create(user=user, **validated_data)
