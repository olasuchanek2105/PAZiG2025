from django.db import models

# Create your models here.
class Orders(models.Model):
    order_id = models.CharField(max_length=20, unique=True)
    user_id = models.IntegerField()
    category_id = models.IntegerField()
    title = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    address = models.CharField(max_length=255)
    status = models.IntegerField()

    class Meta:
        indexes = [
            models.Index(fields=['order_id']), 
        ]

    def __str__(self):
        return self.title
    