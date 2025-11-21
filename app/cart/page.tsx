"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Trash2 } from "lucide-react";

export default function CartPage() {
    const { items, removeFromCart, clearCart, total } = useCart();
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleWhatsAppCheckout = async () => {
        if (!name || !phone) {
            alert("Please enter your name and phone number");
            return;
        }

        setLoading(true);

        try {
            // 1. Create Order in DB
            const orderData = {
                customerInfo: { name, phone },
                items: items.map(item => ({
                    product: item.productId,
                    quantity: item.quantity,
                    price: item.price
                })),
                total: total,
                status: 'pending'
            };

            const res = await fetch("/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(orderData),
            });

            if (!res.ok) throw new Error("Failed to create order");

            const order = await res.json();

            // 2. Construct WhatsApp Message
            const message = `Hola! Quiero realizar el pedido #${order._id.substring(0, 8)}.
      
Nombre: ${name}
Telefono: ${phone}

Detalle:
${items.map(item => `- ${item.name} x${item.quantity} ($${item.price * item.quantity})`).join('\n')}

Total: $${total}

Gracias!`;

            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/5491112345678?text=${encodedMessage}`; // Replace with actual number

            // 3. Clear Cart and Redirect
            clearCart();
            window.open(whatsappUrl, '_blank');
            router.push("/");

        } catch (error) {
            console.error(error);
            alert("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (items.length === 0) {
        return (
            <div className="container mx-auto py-16 text-center">
                <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
                <p className="text-gray-600">Go back to the catalog to add some shoes!</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    {items.map((item) => (
                        <div key={item.productId} className="flex items-center border-b py-4">
                            <div className="relative w-24 h-24 flex-shrink-0">
                                {/* Placeholder image if item.image is not valid url or use a default */}
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-md" />
                            </div>
                            <div className="ml-4 flex-1">
                                <h3 className="text-lg font-medium">{item.name}</h3>
                                <p className="text-gray-500">${item.price}</p>
                                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                            </div>
                            <button
                                onClick={() => removeFromCart(item.productId)}
                                className="text-red-500 hover:text-red-700"
                            >
                                <Trash2 className="h-5 w-5" />
                            </button>
                        </div>
                    ))}
                </div>

                <div className="bg-gray-50 p-6 rounded-lg h-fit">
                    <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                    <div className="flex justify-between mb-4">
                        <span>Total</span>
                        <span className="font-bold text-xl">${total}</span>
                    </div>

                    <div className="space-y-4 mb-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                placeholder="Your Name"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Phone</label>
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                placeholder="Your Phone Number"
                            />
                        </div>
                    </div>

                    <button
                        onClick={handleWhatsAppCheckout}
                        disabled={loading}
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                        {loading ? "Processing..." : "Order via WhatsApp"}
                    </button>
                </div>
            </div>
        </div>
    );
}
