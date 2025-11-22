"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { Check, ShoppingBag, AlertCircle, Heart } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

interface Variant {
    size: string;
    color: string;
    stock: number;
}

interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    salePrice?: number;
    images: string[];
    category: string;
    variants: Variant[];
}

export default function ProductDetailPage() {
    const { id } = useParams();
    const { addToCart } = useCart();
    const { data: session } = useSession();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isFavorite, setIsFavorite] = useState(false);

    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [mainImage, setMainImage] = useState("");

    useEffect(() => {
        if (!id) return;

        fetch(`/api/products/${id}`)
            .then(res => {
                if (!res.ok) throw new Error("Product not found");
                return res.json();
            })
            .then(data => {
                setProduct(data);
                setMainImage(data.images[0]);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    useEffect(() => {
        if (session?.user && product) {
            checkFavoriteStatus();
        }
    }, [session, product]);

    const checkFavoriteStatus = async () => {
        try {
            const res = await fetch('/api/user/favorites');
            const data = await res.json();
            if (data.favorites) {
                const isFav = data.favorites.some((fav: any) => fav._id === product?._id);
                setIsFavorite(isFav);
            }
        } catch (error) {
            console.error('Error checking favorites:', error);
        }
    };

    const toggleFavorite = async () => {
        if (!session?.user) {
            toast.error("Iniciá sesión para guardar favoritos");
            return;
        }

        try {
            const method = isFavorite ? 'DELETE' : 'POST';
            const res = await fetch('/api/user/favorites', {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ productId: product?._id }),
            });

            if (res.ok) {
                setIsFavorite(!isFavorite);
                toast.success(isFavorite ? "Eliminado de favoritos" : "Agregado a favoritos");
            } else {
                toast.error("Error al actualizar favoritos");
            }
        } catch (error) {
            toast.error("Error al actualizar favoritos");
        }
    };

    const handleAddToCart = () => {
        if (!product || !selectedSize || !selectedColor) return;

        addToCart({
            productId: product._id,
            name: product.name,
            price: product.salePrice || product.price,
            image: mainImage,
            quantity: 1,
            size: selectedSize,
            color: selectedColor
        });

        toast.success("Producto agregado al carrito");
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;
    if (error || !product) return <div className="min-h-screen flex items-center justify-center text-red-500">{error || "Producto no encontrado"}</div>;

    // Derived state for variants
    const uniqueSizes = Array.from(new Set(product.variants.map(v => v.size))).sort();

    // Check availability for a size (across all colors)
    const isSizeAvailable = (size: string) => {
        return product.variants.some(v => v.size === size && v.stock > 0);
    };

    // Get available colors for selected size
    const availableColors = selectedSize
        ? Array.from(new Set(product.variants
            .filter(v => v.size === selectedSize && v.stock > 0)
            .map(v => v.color)))
        : [];

    const hasDiscount = product.salePrice && product.salePrice < product.price;
    const discountPercentage = hasDiscount
        ? Math.round(((product.price - product.salePrice!) / product.price) * 100)
        : 0;

    return (
        <div className="container mx-auto px-4 py-8 md:py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                {/* Image Gallery */}
                <div className="space-y-4">
                    <div className="aspect-[4/5] bg-gray-100 rounded-lg overflow-hidden relative">
                        <img
                            src={mainImage}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                        {hasDiscount && (
                            <span className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 font-bold rounded">
                                -{discountPercentage}%
                            </span>
                        )}
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        {product.images.map((img, idx) => (
                            <button
                                key={idx}
                                onClick={() => setMainImage(img)}
                                className={`aspect-square rounded-md overflow-hidden border-2 ${mainImage === img ? 'border-black' : 'border-transparent'}`}
                            >
                                <img src={img} alt={`View ${idx}`} className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product Info */}
                <div className="flex flex-col">
                    <nav className="text-sm text-gray-500 mb-4">
                        <Link href="/" className="hover:underline">Inicio</Link> &gt;
                        <Link href="/products" className="hover:underline mx-1">Catálogo</Link> &gt;
                        <span className="text-black font-medium mx-1">{product.category}</span>
                    </nav>

                    <div className="flex justify-between items-start">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>
                        <button
                            onClick={toggleFavorite}
                            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                        >
                            <Heart className={`w-6 h-6 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                        </button>
                    </div>

                    <div className="flex items-baseline gap-4 mb-6">
                        {hasDiscount ? (
                            <>
                                <span className="text-3xl font-bold text-red-600">${product.salePrice}</span>
                                <span className="text-xl text-gray-400 line-through">${product.price}</span>
                            </>
                        ) : (
                            <span className="text-3xl font-bold text-gray-900">${product.price}</span>
                        )}
                    </div>

                    <div className="prose prose-sm text-gray-600 mb-8">
                        <p>{product.description}</p>
                    </div>

                    {/* Selectors */}
                    <div className="space-y-6 mb-8">
                        {/* Size Selector */}
                        <div>
                            <h3 className="text-sm font-medium text-gray-900 mb-3">Talle</h3>
                            <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                                {uniqueSizes.map(size => {
                                    const available = isSizeAvailable(size);
                                    const selected = selectedSize === size;
                                    return (
                                        <button
                                            key={size}
                                            disabled={!available}
                                            onClick={() => {
                                                setSelectedSize(size);
                                                setSelectedColor(""); // Reset color when size changes
                                            }}
                                            className={`
                                                py-3 text-sm font-bold rounded border
                                                ${selected
                                                    ? 'bg-black text-white border-black'
                                                    : available
                                                        ? 'bg-white text-gray-900 border-gray-200 hover:border-black'
                                                        : 'bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed decoration-slice line-through'
                                                }
                                            `}
                                        >
                                            {size}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Color Selector */}
                        {selectedSize && (
                            <div>
                                <h3 className="text-sm font-medium text-gray-900 mb-3">Color</h3>
                                <div className="flex flex-wrap gap-3">
                                    {availableColors.map(color => (
                                        <button
                                            key={color}
                                            onClick={() => setSelectedColor(color)}
                                            className={`
                                                px-6 py-2 text-sm font-medium rounded-full border
                                                ${selectedColor === color
                                                    ? 'bg-black text-white border-black'
                                                    : 'bg-white text-gray-900 border-gray-200 hover:border-black'
                                                }
                                            `}
                                        >
                                            {color}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Add to Cart Button */}
                    <button
                        onClick={handleAddToCart}
                        disabled={!selectedSize || !selectedColor}
                        className={`
                            w-full py-4 px-8 flex items-center justify-center gap-2 rounded-lg text-lg font-bold transition-all
                            ${(!selectedSize || !selectedColor)
                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                : 'bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                            }
                        `}
                    >
                        <ShoppingBag className="w-5 h-5" />
                        {(!selectedSize || !selectedColor) ? 'Seleccioná Talle y Color' : 'Agregar al Carrito'}
                    </button>

                    {/* Additional Info */}
                    <div className="mt-8 border-t pt-6 space-y-4">
                        <div className="flex items-start gap-3 text-sm text-gray-600">
                            <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                            <span>Envío gratis en compras superiores a $100.000</span>
                        </div>
                        <div className="flex items-start gap-3 text-sm text-gray-600">
                            <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                            <span>Cambio gratis en todos nuestros locales</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
