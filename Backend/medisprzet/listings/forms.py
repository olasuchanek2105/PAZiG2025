from django import forms
from .models import Orders  # Upewnij się, że importujesz poprawny model

class OrderForm(forms.ModelForm):
    class Meta:
        model = Orders
        fields = ['user_id', 'category_id', 'title', 'description', 'price', 'address', 'status']
