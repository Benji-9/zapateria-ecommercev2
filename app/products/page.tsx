"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { FilterSidebar } from "@/components/catalog/FilterSidebar";
import { ProductCard } from "@/components/ui/ProductCard";

function CatalogContent() {
    const searchParams = useSearchParams();
    const initialCategory = searchParams.get("category") || "";

    const [products, setProducts] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
    const [filters, setFilters] = useState({
        category: initialCategory,
        minPrice: 0,
        maxPrice: 500000,
        size: "",
    });

    useEffect(() => {
        // Fetch Products
        fetch("/api/products")
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
                setFilteredProducts(data);
            })
            .catch((err) => console.error("Failed to fetch products", err));

        // Fetch Categories
        fetch("/api/categories")
            .then((res) => res.json())
            .then((data) => setCategories(data))
            .catch((err) => console.error("Failed to fetch categories", err));
    }, []);

    useEffect(() => {
        let result = products;

        // Filter by Category
        if (filters.category) {
            result = result.filter((p) => p.category.toLowerCase() === filters.category.toLowerCase());
        }

        // Filter by Price
        result = result.filter((p) => {
            const price = p.salePrice || p.price;
            return price >= filters.minPrice && price <= filters.maxPrice;
        });

        // Filter by Size
        if (filters.size) {
            result = result.filter((p) =>
                p.variants?.some((v: any) => v.size === filters.size && v.stock > 0)
            );
        }

        setFilteredProducts(result);
    }, [filters, products]);

    return (
        <div className="container px-4 md:px-6 py-8">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar */}
                <aside className="flex-shrink-0">
                    <FilterSidebar
                        onFilterChange={(newFilters) => setFilters(prev => ({ ...prev, ...newFilters }))}
                        categories={categories}
                    />
                </aside>

                {/* Product Grid */}
                <div className="flex-1">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold">Catálogo</h1>
                        <span className="text-gray-500">{filteredProducts.length} productos</span>
                    </div>

                    {filteredProducts.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                            No se encontraron productos con estos filtros.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProducts.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function CatalogPage() {
    return (
        <Suspense fallback={<div>Cargando catálogo...</div>}>
            <CatalogContent />
        </Suspense>
    );
}
