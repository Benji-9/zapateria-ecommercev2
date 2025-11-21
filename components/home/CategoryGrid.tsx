"use client";

import Link from "next/link";
import Image from "next/image";

const categories = [
    {
        name: "Mujer",
        slug: "mujer",
        image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1000&auto=format&fit=crop",
    },
    {
        name: "Hombre",
        slug: "hombre",
        image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1000&auto=format&fit=crop",
    },
    {
        name: "Niños",
        slug: "ninos",
        image: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?q=80&w=1000&auto=format&fit=crop",
    },
];

export function CategoryGrid() {
    return (
        <section className="py-12 bg-gray-50">
            <div className="container px-4 md:px-6">
                <h2 className="text-3xl font-bold text-center mb-10">Categorías Destacadas</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {categories.map((cat) => (
                        <Link
                            key={cat.slug}
                            href={`/products?category=${cat.slug}`}
                            className="group relative h-[400px] overflow-hidden rounded-lg shadow-lg block"
                        >
                            <div className="absolute inset-0">
                                {/* Using standard img tag for external URLs to avoid next/image config issues for now, or assume domains are allowed. 
                     I'll use img for simplicity in this demo phase or if I don't want to config next.config.ts right now. 
                     Actually, standard <img> is safer for random unsplash urls without config. */}
                                <img
                                    src={cat.image}
                                    alt={cat.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <h3 className="text-4xl font-bold text-white tracking-wider uppercase border-b-2 border-white pb-2">
                                    {cat.name}
                                </h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
