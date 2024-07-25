import mongoose from "mongoose";

const sellerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    storename: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female"]
    },
    profilePic: {
        type: String,
        default: ""
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

const Seller = mongoose.model('Seller', sellerSchema);
export default Seller;