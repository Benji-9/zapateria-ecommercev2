import { CreditCard, Truck, ShieldCheck } from "lucide-react";

export function PromotionsBanner() {
    return (
        <div className="w-full bg-gray-50 border-y border-gray-100 py-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div className="flex flex-col items-center space-y-2">
                        <div className="p-3 bg-indigo-100 rounded-full text-indigo-600">
                            <CreditCard className="h-6 w-6" />
                        </div>
                        <h3 className="font-semibold text-gray-900">3 y 6 Cuotas Sin Interés</h3>
                        <p className="text-sm text-gray-500">Con todas las tarjetas bancarias</p>
                    </div>

                    <div className="flex flex-col items-center space-y-2">
                        <div className="p-3 bg-indigo-100 rounded-full text-indigo-600">
                            <Truck className="h-6 w-6" />
                        </div>
                        <h3 className="font-semibold text-gray-900">Envíos Gratis</h3>
                        <p className="text-sm text-gray-500">En compras superiores a $150.000</p>
                    </div>

                    <div className="flex flex-col items-center space-y-2">
                        <div className="p-3 bg-indigo-100 rounded-full text-indigo-600">
                            <ShieldCheck className="h-6 w-6" />
                        </div>
                        <h3 className="font-semibold text-gray-900">Compra Segura</h3>
                        <p className="text-sm text-gray-500">Tus datos siempre protegidos</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
