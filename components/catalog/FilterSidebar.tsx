"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface FilterSidebarProps {
    onFilterChange: (filters: any) => void;
    categories: any[];
}

export function FilterSidebar({ onFilterChange, categories }: FilterSidebarProps) {
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 500000]);
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [selectedSize, setSelectedSize] = useState<string>("");

    const sizes = ["35", "36", "37", "38", "39", "40", "41", "42", "43", "44"];

    useEffect(() => {
        onFilterChange({
            minPrice: priceRange[0],
            maxPrice: priceRange[1],
            category: selectedCategory,
            size: selectedSize,
        });
    }, [priceRange, selectedCategory, selectedSize]);

    return (
        <div className="w-full md:w-64 space-y-8">
            {/* Categories */}
            <div>
                <h3 className="text-lg font-semibold mb-4">Categorías</h3>
                <div className="space-y-2">
                    <button
                        onClick={() => setSelectedCategory("")}
                        className={`block w-full text-left px-2 py-1 rounded ${selectedCategory === "" ? "bg-gray-100 font-medium" : "hover:bg-gray-50"
                            }`}
                    >
                        Todas
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat._id}
                            onClick={() => setSelectedCategory(cat.slug)}
                            className={`block w-full text-left px-2 py-1 rounded ${selectedCategory === cat.slug ? "bg-gray-100 font-medium" : "hover:bg-gray-50"
                                }`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Price */}
            <div>
                <h3 className="text-lg font-semibold mb-4">Precio</h3>
                <div className="flex items-center gap-2">
                    <input
                        type="number"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                        className="w-20 border rounded px-2 py-1 text-sm"
                        placeholder="Min"
                    />
                    <span>-</span>
                    <input
                        type="number"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                        className="w-20 border rounded px-2 py-1 text-sm"
                        placeholder="Max"
                    />
                </div>
            </div>

            {/* Sizes */}
            <div>
                <h3 className="text-lg font-semibold mb-4">Talle</h3>
                <div className="grid grid-cols-4 gap-2">
                    {sizes.map((size) => (
                        <button
                            key={size}
                            onClick={() => setSelectedSize(selectedSize === size ? "" : size)}
                            className={`border rounded py-1 text-sm ${selectedSize === size
                                    ? "bg-black text-white border-black"
                                    : "hover:border-black"
                                }`}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </div>

            <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                    setPriceRange([0, 500000]);
                    setSelectedCategory("");
                    setSelectedSize("");
                }}
            >
                Limpiar Filtros
            </Button>
        </div>
    );
}
