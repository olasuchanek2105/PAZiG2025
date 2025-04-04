from django.db import models

class Orders(models.Model):
    order_id = models.AutoField(primary_key=True)  # Automatycznie inkrementowane ID
    user_id = models.IntegerField()
    category_id = models.IntegerField()
    title = models.CharField(max_length=255)  # Ograniczenie długości zamiast TextField
    description = models.TextField(blank=True, null=True)  # Może być puste
    price = models.DecimalField(max_digits=10, decimal_places=2)  # Wymagane argumenty
    created_at = models.DateTimeField(auto_now_add=True)  # Automatyczna data dodania
    address = models.CharField(max_length=255)  # Poprawiony typ dla adresu
    status = models.IntegerField()

    class Meta:
        indexes = [
            models.Index(fields=['user_id']),  # Indeks dla user_id
            models.Index(fields=['category_id']),
        ]

    def __str__(self):
        return self.title  # Wcześniej było `self.name`, ale to pole nie istnieje

