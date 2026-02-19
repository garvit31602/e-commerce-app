import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const productSchema=new mongoose.Schema({
    url: String,
    product_id: Number,
    product_description: String,
    initial_price: String,
    final_price: String,
    images: [String]
})

const cartSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: [
    {
      productId: Number,
      name: String,
      price: Number,
      quantity: Number
    },
  ],
});

const User = mongoose.model('User', userSchema);
const Product=mongoose.model('Product',productSchema);
const Cart=mongoose.model('Cart',cartSchema)

export default {User,Product,Cart}