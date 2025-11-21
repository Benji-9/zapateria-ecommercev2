import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
        maxlength: [100, 'Name cannot be more than 100 characters'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Please provide a description'],
    },
    price: {
        type: Number,
        required: [true, 'Please provide a price'],
    },
    salePrice: {
        type: Number, // Optional sale price
    },
    category: {
        type: String, // For now keeping as string, could be Ref to Category
        required: [true, 'Please provide a category'],
        index: true,
    },
    images: {
        type: [String], // Array of image URLs
        required: [true, 'Please provide at least one image'],
    },
    variants: [{
        size: {
            type: String, // e.g., "38", "40"
            required: true,
        },
        color: {
            type: String, // e.g., "Negro", "Rojo"
            required: true,
        },
        stock: {
            type: Number,
            required: true,
            min: 0,
            default: 0,
        }
    }],
    isNewProduct: { // 'isNew' is a reserved mongoose property
        type: Boolean,
        default: true,
    },
    isFeatured: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

// Virtual for checking if any variant has stock
ProductSchema.virtual('inStock').get(function () {
    return this.variants.some((v: any) => v.stock > 0);
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
