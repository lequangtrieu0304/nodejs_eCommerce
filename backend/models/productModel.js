import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    rating: {
        type: Number,
        require: true,
        default: 0,
        min: 0,
        max: 5,
    },
    comment: {
        type: String,
        require: true,
    }
}, {
    timestamps: true,
});

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true,
    },
    category: {
        type: String,
        require: true,
    },
    brand: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true,
    },
    countInStock: {
        type: Number,
        default: 0,
        require: true
    },
    rating: {
        type: String,
        default: 0.0,
        require: true
    },
    numReview: {
        type: Number,
        default: 0,
        require: true,
    },
    reviews: [reviewSchema],
}, {
    timestamps: true,
})

const Product = mongoose.model('Product', productSchema);
export default Product;