"use client";

import { useState, useEffect } from "react";
import { HeroBanner } from "@/components/home/HeroBanner";
import { PromotionsBanner } from "@/components/home/PromotionsBanner";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { ProductCard } from "@/components/ui/ProductCard";

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        // Filter for featured or just take first 4 for now
        setFeaturedProducts(data.slice(0, 4));
      })
      .catch((err) => console.error("Failed to fetch products", err));
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <HeroBanner />
      <PromotionsBanner />
      <CategoryGrid />

      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold tracking-tighter">
              Novedades
            </h2>
            <a href="/products" className="text-indigo-600 hover:text-indigo-800 font-medium">
              Ver todo &rarr;
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product: any) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
