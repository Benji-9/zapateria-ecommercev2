"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { Trash2, Plus } from "lucide-react";

interface Variant {
    size: string;
    color: string;
    stock: number;
}

export default function EditProductPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const { id } = useParams();

    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        salePrice: "",
        category: "",
        images: "", // comma separated for now
    });
    const [variants, setVariants] = useState<Variant[]>([]);
    const [error, setError] = useState("");

    useEffect(() => {
        if (id) {
            fetch(`/api/products/${id}`)
                .then(res => res.json())
                .then(data => {
                    setFormData({
                        name: data.name,
                        description: data.description,
                        price: data.price,
                        salePrice: data.salePrice || "",
                        category: data.category,
                        images: data.images.join(", "),
                    });
                    setVariants(data.variants || []);
                    setLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    setError("Failed to load product");
                    setLoading(false);
                });
        }
    }, [id]);

    if (status === "loading" || loading) return <p>Loading...</p>;

    if (!session || (session.user as any).role !== "admin") {
        router.push("/");
        return null;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleVariantChange = (index: number, field: keyof Variant, value: string | number) => {
        const newVariants = [...variants];
        newVariants[index] = { ...newVariants[index], [field]: value };
        setVariants(newVariants);
    };

    const addVariant = () => {
        setVariants([...variants, { size: "", color: "", stock: 0 }]);
    };

    const removeVariant = (index: number) => {
        setVariants(variants.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const payload = {
            ...formData,
            price: Number(formData.price),
            salePrice: formData.salePrice ? Number(formData.salePrice) : undefined,
            images: formData.images.split(",").map(s => s.trim()).filter(s => s),
            variants: variants.map(v => ({ ...v, stock: Number(v.stock) }))
        };

        try {
            const res = await fetch(`/api/products/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                router.push("/admin/products");
                router.refresh();
            } else {
                const data = await res.json();
                setError(data.message || "Failed to update product");
            }
        } catch (err) {
            setError("An error occurred");
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Basic Info */}
                <div className="bg-white p-6 rounded-lg shadow space-y-4">
                    <h2 className="text-lg font-medium">Basic Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Category</label>
                            <input
                                type="text"
                                name="category"
                                required
                                value={formData.category}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Price</label>
                            <input
                                type="number"
                                name="price"
                                required
                                value={formData.price}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Sale Price (Optional)</label>
                            <input
                                type="number"
                                name="salePrice"
                                value={formData.salePrice}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            name="description"
                            required
                            rows={4}
                            value={formData.description}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Images (Comma separated URLs)</label>
                        <input
                            type="text"
                            name="images"
                            required
                            value={formData.images}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        />
                    </div>
                </div>

                {/* Variants */}
                <div className="bg-white p-6 rounded-lg shadow space-y-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-medium">Variants (Size & Color)</h2>
                        <button
                            type="button"
                            onClick={addVariant}
                            className="flex items-center text-sm text-indigo-600 hover:text-indigo-800"
                        >
                            <Plus className="w-4 h-4 mr-1" /> Add Variant
                        </button>
                    </div>

                    <div className="space-y-2">
                        {variants.map((variant, index) => (
                            <div key={index} className="flex gap-4 items-end border-b pb-2">
                                <div>
                                    <label className="block text-xs text-gray-500">Size</label>
                                    <input
                                        type="text"
                                        value={variant.size}
                                        onChange={(e) => handleVariantChange(index, 'size', e.target.value)}
                                        className="block w-20 border border-gray-300 rounded-md shadow-sm p-1"
                                        placeholder="38"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-500">Color</label>
                                    <input
                                        type="text"
                                        value={variant.color}
                                        onChange={(e) => handleVariantChange(index, 'color', e.target.value)}
                                        className="block w-32 border border-gray-300 rounded-md shadow-sm p-1"
                                        placeholder="Negro"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-500">Stock</label>
                                    <input
                                        type="number"
                                        value={variant.stock}
                                        onChange={(e) => handleVariantChange(index, 'stock', e.target.value)}
                                        className="block w-24 border border-gray-300 rounded-md shadow-sm p-1"
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => removeVariant(index)}
                                    className="text-red-500 hover:text-red-700 mb-1"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {error && <p className="text-red-500">{error}</p>}

                <div className="flex justify-end gap-4">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
}
