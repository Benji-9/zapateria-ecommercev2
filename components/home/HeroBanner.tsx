"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroBanner() {
    return (
        <div className="relative w-full h-[500px] bg-gray-900 text-white overflow-hidden">
            {/* Background Image Placeholder - In production this would be dynamic */}
            <div
                className="absolute inset-0 bg-cover bg-center opacity-60"
                style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop")' }}
            />

            <div className="relative z-10 container h-full flex flex-col justify-center items-start px-4 md:px-6">
                <h2 className="text-xl md:text-2xl font-medium mb-2 tracking-wide uppercase">Nueva Colección 2025</h2>
                <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                    Caminá con Estilo <br /> y Comodidad
                </h1>
                <p className="text-lg md:text-xl mb-8 max-w-lg text-gray-200">
                    Descubrí los modelos que marcan tendencia esta temporada. Calidad artesanal en cada paso.
                </p>
                <Link href="/products">
                    <Button size="lg" className="bg-white text-black hover:bg-gray-200 text-lg px-8 py-6">
                        Ver Catálogo
                    </Button>
                </Link>
            </div>
        </div>
    );
}
