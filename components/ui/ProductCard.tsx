"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

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
    const mainImage = product.images?.[0] || "/placeholder.png";
    const hasDiscount = product.salePrice && product.salePrice < product.price;
    const discountPercentage = hasDiscount
        ? Math.round(((product.price - product.salePrice!) / product.price) * 100)
        : 0;

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

                <Button
                    className="w-full mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    onClick={() => addToCart({
                        productId: product._id,
                        name: product.name,
                        price: product.salePrice || product.price,
                        image: mainImage,
                        quantity: 1
                    })}
                >
                    Agregar al Carrito
                </Button>
            </div>
        </div>
    );
}
