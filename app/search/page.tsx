"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ProductCard } from "@/components/ui/ProductCard";

interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    salePrice?: number;
    images: string[];
    category: string;
    variants: any[];
}

export default function SearchPage() {
    const searchParams = useSearchParams();
    const query = searchParams.get("q");
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (query) {
            setLoading(true);
            fetch(`/api/products?search=${encodeURIComponent(query)}`)
                .then((res) => res.json())
                .then((data) => {
                    setProducts(data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error(err);
                    setLoading(false);
                });
        } else {
            setProducts([]);
            setLoading(false);
        }
    }, [query]);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">
                Resultados para: <span className="text-indigo-600">"{query}"</span>
            </h1>

            {loading ? (
                <p>Buscando...</p>
            ) : products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No encontramos productos que coincidan con tu búsqueda.</p>
                </div>
            )}
        </div>
    );
}
