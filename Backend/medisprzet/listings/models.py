from django.db import models
import uuid
from django.contrib.auth.models import User
# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name
        
class Listing(models.Model):
    class Status(models.TextChoices):
        AVAILABLE = "Dostępne"
        SOLD =  "Sprzedane"
        RESERVED = "Zarezerwowane"


    listing_id = models.CharField(max_length=20, unique=True, blank=True, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='listings')
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True)
    title = models.CharField(max_length=255, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2,blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True,blank=True, null=True)
    address = models.CharField(max_length=255,blank=True, null=True)
    status = models.CharField(max_length=20,choices=Status.choices,default=Status.AVAILABLE,)
    image = models.ImageField(upload_to='images/', null=True, blank=True)
    producent = models.CharField(max_length=255,blank=True, null=True)
    #na razie wszystkie pola moga byc puste w ramach testów, do zmiany w przyszlosci

#nadpisanie funkcji save, przy kazdym zapisaniu nowego ogloszenia generujemy uid 
    def save(self, *args, **kwargs): 
        if not self.listing_id:
            self.listing_id = str(uuid.uuid4())[:8]  
        super().save(*args, **kwargs)


    class Meta:
        indexes = [
            models.Index(fields=['listing_id']), 
        ]

    def __str__(self):
        return self.title
    