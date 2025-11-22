'use client';

import { useEffect, useState } from 'react';
import ProductForm from '@/components/admin/ProductForm';
import { useParams } from 'next/navigation';

export default function EditProductPage() {
    const params = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (params.id) {
            fetch(`/api/admin/products?id=${params.id}`)
                .then(res => res.json())
                .then(data => {
                    // The API returns { products: [...] } for list, but I need a single product endpoint or filter
                    // My current API is: GET /api/admin/products returns all products.
                    // I should update the API to support fetching a single product by ID.
                    // Or I can filter client side for now if the list is small, but better to update API.
                    // Let's assume I'll update the API to handle ?id=...
                    // Wait, my API implementation for GET currently returns ALL products.
                    // I need to update GET in app/api/admin/products/route.ts to handle ?id=
                    if (data.products) {
                        // Temporary client-side filter if API returns all
                        const found = data.products.find((p: any) => p._id === params.id);
                        setProduct(found);
                    } else if (data.product) {
                        setProduct(data.product);
                    }
                    setLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    setLoading(false);
                });
        }
    }, [params.id]);

    if (loading) return <div>Loading product...</div>;
    if (!product) return <div>Product not found</div>;

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Edit Product</h1>
            <ProductForm initialData={product} />
        </div>
    );
}
