"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";

interface Product {
    _id: string;
    name: string;
    price: number;
    image: string;
    category: string;
}

export function ProductList() {
    const [products, setProducts] = useState<Product[]>([]);
    const { addToCart } = useCart();

    useEffect(() => {
        fetch("/api/products")
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch((err) => console.error("Failed to fetch products", err));
    }, []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
                <div key={product._id} className="group relative overflow-hidden rounded-lg border bg-background p-2">
                    <div className="aspect-square overflow-hidden rounded-md bg-gray-100 relative">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover object-center group-hover:opacity-75"
                        />
                    </div>
                    <div className="flex flex-col space-y-1 p-4">
                        <h3 className="text-lg font-semibold">{product.name}</h3>
                        <p className="text-sm text-gray-500">{product.category}</p>
                        <div className="text-lg font-bold">${product.price}</div>
                        <Button
                            onClick={() => addToCart({
                                productId: product._id,
                                name: product.name,
                                price: product.price,
                                image: product.image,
                                quantity: 1
                            })}
                            className="w-full mt-2"
                        >
                            Add to Cart
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
}
