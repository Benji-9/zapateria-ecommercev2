"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

interface ProductCardProps {
    product: {
        _id: string;
        name: string;
        price: number;
        salePrice?: number;
        images: string[];
        category: string;
        isNewProduct?: boolean;
        variants: any[];
    };
}

export function ProductCard({ product }: ProductCardProps) {
    const { addToCart } = useCart();
    const { data: session } = useSession();
    const [isFavorite, setIsFavorite] = useState(false);
    const mainImage = product.images?.[0] || "/placeholder.png";
    const hasDiscount = product.salePrice && product.salePrice < product.price;
    const discountPercentage = hasDiscount
        ? Math.round(((product.price - product.salePrice!) / product.price) * 100)
        : 0;

    useEffect(() => {
        if (session?.user) {
            checkFavoriteStatus();
        }
    }, [session]);

    const checkFavoriteStatus = async () => {
        try {
            const res = await fetch('/api/user/favorites');
            const data = await res.json();
            if (data.favorites) {
                const isFav = data.favorites.some((fav: any) => fav._id === product._id);
                setIsFavorite(isFav);
            }
        } catch (error) {
            console.error('Error checking favorites:', error);
        }
    };

    const toggleFavorite = async (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent link navigation
        if (!session?.user) {
            toast.error("Iniciá sesión para guardar favoritos");
            return;
        }

        try {
            const method = isFavorite ? 'DELETE' : 'POST';
            const res = await fetch('/api/user/favorites', {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ productId: product._id }),
            });

            if (res.ok) {
                setIsFavorite(!isFavorite);
                toast.success(isFavorite ? "Eliminado de favoritos" : "Agregado a favoritos");
            } else {
                toast.error("Error al actualizar favoritos");
            }
        } catch (error) {
            toast.error("Error al actualizar favoritos");
        }
    };

    return (
        <div className="group relative bg-white rounded-lg overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300">
            {/* Badges */}
            <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
                {product.isNewProduct && (
                    <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
                        NUEVO
                    </span>
                )}
                {hasDiscount && (
                    <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                        -{discountPercentage}%
                    </span>
                )}
            </div>

            {/* Favorite Button */}
            <button
                onClick={toggleFavorite}
                className="absolute top-2 right-2 z-20 p-2 rounded-full bg-white/80 hover:bg-white shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-200"
            >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
            </button>

            {/* Image */}
            <Link href={`/products/${product._id}`} className="block relative aspect-[4/5] overflow-hidden bg-gray-100">
                <img
                    src={mainImage}
                    alt={product.name}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
            </Link>

            {/* Content */}
            <div className="p-4">
                <p className="text-sm text-gray-500 mb-1 uppercase tracking-wide">{product.category}</p>
                <Link href={`/products/${product._id}`}>
                    <h3 className="text-lg font-medium text-gray-900 hover:text-indigo-600 truncate">
                        {product.name}
                    </h3>
                </Link>

                <div className="mt-2 flex items-baseline gap-2">
                    {hasDiscount ? (
                        <>
                            <span className="text-lg font-bold text-red-600">${product.salePrice}</span>
                            <span className="text-sm text-gray-400 line-through">${product.price}</span>
                        </>
                    ) : (
                        <span className="text-lg font-bold text-gray-900">${product.price}</span>
                    )}
                </div>

                <Link
                    href={`/products/${product._id}`}
                    className="block w-full mt-4 text-center bg-black text-white py-2 rounded hover:bg-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                    Ver Detalles
                </Link>
            </div>
        </div>
    );
}
