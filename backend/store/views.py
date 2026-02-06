from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db import transaction
from .models import StoreProduct, RedemptionOrder
from .serializers import StoreProductSerializer, RedemptionOrderSerializer
from gamification.models import PointsWallet, PointsTransaction

class StoreProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = StoreProduct.objects.filter(is_active=True)
    serializer_class = StoreProductSerializer
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=True, methods=['post'])
    def redeem(self, request, pk=None):
        product = self.get_object()
        user = request.user
        
        with transaction.atomic():
            wallet, _ = PointsWallet.objects.select_for_update().get_or_create(user=user)
            
            if wallet.current_balance < product.cost:
               return Response({'detail': 'Insufficient points'}, status=status.HTTP_400_BAD_REQUEST)
            
            # Deduct points
            wallet.current_balance -= product.cost
            wallet.save()
            
            # Record transaction
            PointsTransaction.objects.create(
                wallet=wallet,
                amount=-product.cost,
                transaction_type='SPEND',
                description=f'Redeemed: {product.name}'
            )
            
            # Create Order
            order = RedemptionOrder.objects.create(
                user=user,
                product=product,
                cost_paid=product.cost
            )
            
            return Response(RedemptionOrderSerializer(order).data, status=status.HTTP_201_CREATED)

class RedemptionOrderViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = RedemptionOrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return RedemptionOrder.objects.filter(user=self.request.user).order_by('-ordered_at')
