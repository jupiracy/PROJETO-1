"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import api from "@/lib/axios";

export default function StorePage() {
    const [products, setProducts] = useState<any[]>([]);
    const [wallet, setWallet] = useState<any>(null);

    const fetchStore = async () => {
        try {
            const prodRes = await api.get("/store/products/");
            setProducts(prodRes.data);
            const walletRes = await api.get("/gamification/wallet/");
            setWallet(walletRes.data);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        fetchStore();
    }, []);

    const handleRedeem = async (id: number) => {
        try {
            await api.post(`/store/products/${id}/redeem/`);
            alert("Redeemed successfully!");
            fetchStore(); // Refresh balance
        } catch (e: any) {
            alert(e.response?.data?.detail || "Redemption failed");
        }
    };

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Rewards Store</h1>
                <div className="text-xl font-bold">Balance: {wallet?.current_balance || 0} PTS</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <Card key={product.id}>
                        {product.image && (
                            <div className="h-48 bg-gray-200 rounded-t-lg overflow-hidden">
                                {/* <img src={product.image} alt={product.name} className="w-full h-full object-cover" /> */}
                            </div>
                        )}
                        <CardHeader>
                            <CardTitle>{product.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-500 mb-2">{product.description}</p>
                            <div className="flex justify-between items-center mt-4">
                                <span className="font-bold text-primary">{product.cost} PTS</span>
                                <Button
                                    onClick={() => handleRedeem(product.id)}
                                    disabled={(wallet?.current_balance || 0) < product.cost}
                                >
                                    Redeem
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
