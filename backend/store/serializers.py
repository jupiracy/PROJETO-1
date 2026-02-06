from rest_framework import serializers
from .models import StoreProduct, RedemptionOrder

class StoreProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = StoreProduct
        fields = ['id', 'name', 'description', 'cost', 'stock', 'image', 'is_active']

class RedemptionOrderSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', read_only=True)

    class Meta:
        model = RedemptionOrder
        fields = ['id', 'product', 'product_name', 'cost_paid', 'ordered_at', 'status']
        read_only_fields = ['cost_paid', 'status', 'ordered_at']
