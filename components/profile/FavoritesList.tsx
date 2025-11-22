'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'sonner';

interface Product {
    _id: string;
    name: string;
    price: number;
    images: string[];
    slug: string;
}

export default function FavoritesList() {
    const [favorites, setFavorites] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFavorites();
    }, []);

    const fetchFavorites = async () => {
        try {
            const res = await fetch('/api/user/favorites');
            const data = await res.json();
            if (res.ok) {
                setFavorites(data.favorites);
            }
        } catch (error) {
            console.error('Error fetching favorites:', error);
        } finally {
            setLoading(false);
        }
    };

    const removeFavorite = async (productId: string) => {
        try {
            const res = await fetch('/api/user/favorites', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ productId }),
            });

            if (res.ok) {
                setFavorites(favorites.filter(f => f._id !== productId));
                toast.success('Removed from favorites');
            }
        } catch (error) {
            toast.error('Failed to remove favorite');
        }
    };

    if (loading) return <div>Loading favorites...</div>;

    if (favorites.length === 0) {
        return <div className="text-gray-500">No favorites yet.</div>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {favorites.map((product) => (
                <div key={product._id} className="border rounded-lg overflow-hidden group relative">
                    <Link href={`/products/${product.slug}`}>
                        <div className="relative h-64 w-full bg-gray-100">
                            {product.images?.[0] && (
                                <Image
                                    src={product.images[0]}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                />
                            )}
                        </div>
                    </Link>
                    <div className="p-4">
                        <Link href={`/products/${product.slug}`}>
                            <h3 className="font-medium text-lg mb-1 hover:underline">{product.name}</h3>
                        </Link>
                        <p className="text-gray-600">${product.price}</p>
                        <button
                            onClick={() => removeFavorite(product._id)}
                            className="mt-2 text-sm text-red-500 hover:text-red-700"
                        >
                            Remove
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
