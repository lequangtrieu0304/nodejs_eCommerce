import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    orderItems: [{
        name: {type: String, required: true},
        image: {type: String, required: true},
        price: {type: String, required: true},
        qty: {type: String, required: true},
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        }
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    shipping: {
        address: String,
        city: String,
        postalCode: String,
        country: String,
    },
    payment: {
        paymentMethod: String
    },
    itemsPrice: Number,
    taxPrice: Number,
    shippingPrice: Number,
    totalPrice: Number,
}, {
    timestamps: true,
});

const Order = mongoose.model('Order', orderSchema)

export default Order;