import mongoose, { Schema } from "mongoose";


const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    email: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    review: {
        type: [reviewSchema],
        default: [],
    },
    seller: {
        type: Schema.Types.ObjectId,
        ref: "Seller",
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    producttype:{
        type:String,
        enum:['Electronics','Fashion','Mobile','Home Appliances']
    }
})

const Product = mongoose.model("Product", productSchema)
export default Product;