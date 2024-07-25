import mongoose, { Schema } from "mongoose";


const contactSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    }
})

const orderSchema = mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    sellerId: {
        type: Schema.Types.ObjectId,
        ref: "Seller",
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    address: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    paymentMethod: {
        type: String,
        enum: ['Card', 'CashOnDelivery'],
        required: true,
    },
    status: {
        type: String,
        enum: ['Delivered', 'Not Delivered'],
        default: 'Not Delivered'
    },
    contactDetail: {
        type: [],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

const Order = mongoose.model('Order', orderSchema);
export default Order;