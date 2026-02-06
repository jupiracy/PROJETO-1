from django.db import models
from django.conf import settings

class StoreProduct(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    cost = models.PositiveIntegerField()
    stock = models.PositiveIntegerField(default=0)
    image = models.ImageField(upload_to='store/', null=True, blank=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name

class RedemptionOrder(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='orders')
    product = models.ForeignKey(StoreProduct, on_delete=models.CASCADE)
    cost_paid = models.PositiveIntegerField()
    ordered_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, default='COMPLETED')
    
    def __str__(self):
        return f"Order {self.id} by {self.user.username}"
