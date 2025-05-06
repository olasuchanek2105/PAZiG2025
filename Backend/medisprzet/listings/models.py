from django.db import models

# Create your models here.
class Orders(models.Model):
    order_id = models.CharField(max_length=20, unique=True, blank=True, null=True)
    user_id = models.IntegerField(blank=True, null=True)
    category_id = models.CharField(max_length=255,blank=True, null=True)
    title = models.CharField(max_length=255, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2,blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True,blank=True, null=True)
    address = models.CharField(max_length=255,blank=True, null=True)
    status = models.CharField(max_length=255,blank=True, null=True)
    image = models.ImageField(upload_to='images/', null=True, blank=True)

    #na razie wszystkie pola moga byc puste w ramach testów, do zmiany w przyszlosci

    class Meta:
        indexes = [
            models.Index(fields=['order_id']), 
        ]

    def __str__(self):
        return self.title
    