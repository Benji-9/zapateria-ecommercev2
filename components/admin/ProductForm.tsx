'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Plus, Trash2 } from 'lucide-react';

interface Variant {
    size: string;
    color: string;
    stock: number;
}

interface Product {
    _id?: string;
    name: string;
    description: string;
    price: number;
    salePrice?: number;
    category: string;
    images: string[];
    variants: Variant[];
    isFeatured: boolean;
}

export default function ProductForm({ initialData }: { initialData?: Product }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<Product>(initialData || {
        name: '',
        description: '',
        price: 0,
        category: '',
        images: [],
        variants: [{ size: '', color: '', stock: 0 }],
        isFeatured: false,
    });
    const [imageInput, setImageInput] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
        });
    };

    const handleVariantChange = (index: number, field: keyof Variant, value: string | number) => {
        const newVariants = [...formData.variants];
        newVariants[index] = { ...newVariants[index], [field]: value };
        setFormData({ ...formData, variants: newVariants });
    };

    const addVariant = () => {
        setFormData({
            ...formData,
            variants: [...formData.variants, { size: '', color: '', stock: 0 }],
        });
    };

    const removeVariant = (index: number) => {
        const newVariants = formData.variants.filter((_, i) => i !== index);
        setFormData({ ...formData, variants: newVariants });
    };

    const addImage = () => {
        if (imageInput.trim()) {
            setFormData({ ...formData, images: [...formData.images, imageInput.trim()] });
            setImageInput('');
        }
    };

    const removeImage = (index: number) => {
        const newImages = formData.images.filter((_, i) => i !== index);
        setFormData({ ...formData, images: newImages });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const url = initialData ? '/api/admin/products' : '/api/admin/products';
            const method = initialData ? 'PUT' : 'POST';
            const body = initialData ? { ...formData, _id: initialData._id } : formData;

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.error);

            toast.success(`Product ${initialData ? 'updated' : 'created'} successfully`);
            router.push('/admin/products');
            router.refresh();
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl bg-white p-6 rounded shadow">
            <div className="space-y-4">
                <h2 className="text-xl font-semibold">Basic Info</h2>
                <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full p-2 border rounded h-24"
                        required
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Price</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                            min="0"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Sale Price (Optional)</label>
                        <input
                            type="number"
                            name="salePrice"
                            value={formData.salePrice || ''}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            min="0"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Category</label>
                    <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        name="isFeatured"
                        checked={formData.isFeatured}
                        onChange={handleChange}
                        className="mr-2"
                    />
                    <label className="text-sm font-medium">Featured Product</label>
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-semibold">Images</h2>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={imageInput}
                        onChange={(e) => setImageInput(e.target.value)}
                        placeholder="Image URL"
                        className="flex-1 p-2 border rounded"
                    />
                    <button type="button" onClick={addImage} className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">Add</button>
                </div>
                <div className="grid grid-cols-4 gap-2">
                    {formData.images.map((img, index) => (
                        <div key={index} className="relative group">
                            <img src={img} alt="Product" className="w-full h-24 object-cover rounded" />
                            <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <Trash2 className="w-3 h-3" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Variants</h2>
                    <button type="button" onClick={addVariant} className="text-sm text-blue-600 hover:underline flex items-center">
                        <Plus className="w-4 h-4 mr-1" /> Add Variant
                    </button>
                </div>
                {formData.variants.map((variant, index) => (
                    <div key={index} className="flex gap-4 items-end border p-4 rounded relative">
                        <div className="flex-1">
                            <label className="block text-xs font-medium mb-1">Size</label>
                            <input
                                type="text"
                                value={variant.size}
                                onChange={(e) => handleVariantChange(index, 'size', e.target.value)}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-xs font-medium mb-1">Color</label>
                            <input
                                type="text"
                                value={variant.color}
                                onChange={(e) => handleVariantChange(index, 'color', e.target.value)}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-xs font-medium mb-1">Stock</label>
                            <input
                                type="number"
                                value={variant.stock}
                                onChange={(e) => handleVariantChange(index, 'stock', parseInt(e.target.value))}
                                className="w-full p-2 border rounded"
                                required
                                min="0"
                            />
                        </div>
                        {formData.variants.length > 1 && (
                            <button
                                type="button"
                                onClick={() => removeVariant(index)}
                                className="text-red-500 hover:text-red-700 mb-2"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                ))}
            </div>

            <div className="flex justify-end gap-4">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-4 py-2 border rounded hover:bg-gray-50"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 disabled:opacity-50"
                >
                    {loading ? 'Saving...' : 'Save Product'}
                </button>
            </div>
        </form>
    );
}
