from rest_framework import viewsets, permissions
from rest_framework.response import Response
from .models import PointsWallet, PointsTransaction
from .serializers import PointsWalletSerializer, PointsTransactionSerializer

class PointsWalletViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = PointsWalletSerializer

    def get_queryset(self):
        return PointsWallet.objects.filter(user=self.request.user)

    def list(self, request, *args, **kwargs):
        instance, _ = PointsWallet.objects.get_or_create(user=request.user)
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

class PointsTransactionViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = PointsTransactionSerializer

    def get_queryset(self):
        return PointsTransaction.objects.filter(wallet__user=self.request.user).order_by('-created_at')
