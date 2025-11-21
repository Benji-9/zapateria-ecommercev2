"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";

export function NewsletterPopup() {
    const [isVisible, setIsVisible] = useState(false);
    const [email, setEmail] = useState("");

    useEffect(() => {
        const hasSubscribed = localStorage.getItem("newsletter_subscribed");
        const hasClosed = localStorage.getItem("newsletter_closed");

        if (!hasSubscribed && !hasClosed) {
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 5000); // Show after 5 seconds

            return () => clearTimeout(timer);
        }
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        localStorage.setItem("newsletter_closed", "true");
    };

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        // Simulate API call
        toast.success("¡Gracias por suscribirte! Tu código es: BIENVENIDA10");
        localStorage.setItem("newsletter_subscribed", "true");
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-lg shadow-2xl max-w-md w-full relative overflow-hidden animate-in fade-in zoom-in duration-300">
                <button
                    onClick={handleClose}
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
                >
                    <X className="h-5 w-5" />
                </button>

                <div className="p-8 text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">¡10% OFF en tu primera compra!</h2>
                    <p className="text-gray-600 mb-6">
                        Suscribite a nuestro newsletter y enterate de todas las novedades y promociones exclusivas.
                    </p>

                    <form onSubmit={handleSubscribe} className="space-y-4">
                        <input
                            type="email"
                            placeholder="Tu email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                        <button
                            type="submit"
                            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors font-medium"
                        >
                            Quiero mi descuento
                        </button>
                    </form>
                    <button
                        onClick={handleClose}
                        className="mt-4 text-sm text-gray-500 hover:text-gray-700 underline"
                    >
                        No gracias, prefiero pagar precio full
                    </button>
                </div>
            </div>
        </div>
    );
}
