import React from 'react';

export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-4xl font-bold mb-6">Sobre Nosotros</h1>
                <p className="text-lg text-gray-700 mb-8">
                    Bienvenidos a <strong>Zapateria Boston</strong>. Desde nuestra inauguración en <strong>1925</strong>, nos hemos dedicado a ofrecer calzado de la más alta calidad a la comunidad de Tres Arroyos y sus alrededores.
                </p>
                <div className="bg-gray-50 p-8 rounded-lg shadow-sm text-left">
                    <h2 className="text-2xl font-semibold mb-4">Nuestra Historia</h2>
                    <p className="text-gray-600 mb-4">
                        Fundada hace casi un siglo, Zapateria Boston ha sido testigo de generaciones de familias que han confiado en nosotros para sus primeros pasos, sus días de escuela, sus bodas y su vida cotidiana.
                    </p>
                    <p className="text-gray-600 mb-4">
                        Ubicados en el corazón de la ciudad, en <strong>Colon 302</strong>, mantenemos viva la tradición del buen servicio y la atención personalizada, combinándola con las últimas tendencias en moda y confort.
                    </p>
                </div>
                <div className="mt-12 grid md:grid-cols-3 gap-8">
                    <div className="p-4">
                        <h3 className="font-bold text-xl mb-2">Calidad</h3>
                        <p className="text-gray-600">Seleccionamos cuidadosamente cada par para asegurar durabilidad y confort.</p>
                    </div>
                    <div className="p-4">
                        <h3 className="font-bold text-xl mb-2">Tradición</h3>
                        <p className="text-gray-600">Casi 100 años de experiencia en el rubro del calzado.</p>
                    </div>
                    <div className="p-4">
                        <h3 className="font-bold text-xl mb-2">Atención</h3>
                        <p className="text-gray-600">Asesoramiento personalizado para encontrar el calzado perfecto para vos.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
