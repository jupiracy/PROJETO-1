from rest_framework import serializers
from .models import PointsWallet, PointsTransaction

class PointsTransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PointsTransaction
        fields = ['id', 'amount', 'transaction_type', 'description', 'created_at']

class PointsWalletSerializer(serializers.ModelSerializer):
    transactions = PointsTransactionSerializer(many=True, read_only=True)

    class Meta:
        model = PointsWallet
        fields = ['current_balance', 'total_earned', 'transactions']
