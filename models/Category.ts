import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a category name'],
        unique: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
    },
    image: {
        type: String, // URL for category image
    }
}, { timestamps: true });

export default mongoose.models.Category || mongoose.model('Category', CategorySchema);
