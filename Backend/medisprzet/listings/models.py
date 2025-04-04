from django.db import models

# Create your models here.
class Orders(models.Model):
    order_id = models.Index()
    user_id = models.IntegerField()
    category_id = models.IntegerField()
    title = models.TextField()
    description = models.TextField()
    price = models.DecimalField()
    created_at = models.DateTimeField()
    address = models.TextField()
    status = models.IntegerField()


    def __str__(self):
        return self.name
