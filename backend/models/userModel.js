

import mongoose, { Schema } from "mongoose";

const usercartSchema = mongoose.Schema({
  productId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  productName: {
    type: String,
    required: true,
  },
  productImg: {
    type: String,
    required: true,
  },
  productPrice: {
    type: Number,
    // required: true,
  }
})

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    minlength: 6,
    required: true,
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'non-binary', 'other'],
    required: true,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  cart: {
    type: [usercartSchema],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', userSchema);

export default User;
