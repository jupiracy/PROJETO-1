from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import StoreProductViewSet, RedemptionOrderViewSet

router = DefaultRouter()
router.register(r'products', StoreProductViewSet)
router.register(r'orders', RedemptionOrderViewSet, basename='orders')

urlpatterns = [
    path('', include(router.urls)),
]
