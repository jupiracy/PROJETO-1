from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PointsWalletViewSet, PointsTransactionViewSet

router = DefaultRouter()
router.register(r'wallet', PointsWalletViewSet, basename='wallet')
router.register(r'transactions', PointsTransactionViewSet, basename='transactions')

urlpatterns = [
    path('', include(router.urls)),
]
