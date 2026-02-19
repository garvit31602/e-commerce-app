import dotenv from 'dotenv';
dotenv.config();
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parse } from 'csv-parse/sync';
import mongoose from 'mongoose';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import bcrypt from 'bcryptjs';
import bodyParser from 'body-parser';
import cors from "cors"
import express from 'express';
import jwt from 'jsonwebtoken';
import models from './models.js';
import cookieParser from "cookie-parser";

const { User ,Cart} = models;

const app = express();

app.use(cookieParser());
app.use(bodyParser.json())
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // your frontend URL
  credentials: true                // allow cookies and Authorization headers
}));

console.log("MONGO_URI =", process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

let refreshTokens=[]

app.post('/signup', async (req, res) => {
    console.log(req.body)
  const { username, email, password } = req.body;
  const user=await User.findOne({email})
  if(user){
   return res.status(400).send('User email already exists')
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, email, password: hashedPassword});

  try {
    await newUser.save();
    res.status(201).send('User created');
  } catch (err) {
    res.status(500).send('Error saving user');
  }
});

app.post('/login',async (req,res)=>{
      const { email, password } = req.body;

  try {
    // 1. Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    // 2. Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
   
    const payload = { id: user._id.toString() };
    const accessToken=generateAccessToken(payload)
    const refreshToken=jwt.sign(payload,process.env.REFRESH_TOKEN_SECRET)
    refreshTokens.push(refreshToken)
    console.log(`Login successful - ${accessToken}`)
     // 3. Success
     res
  .status(200)
  .json({ message: "Login successful" ,accessToken,payload});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
})

app.post('/token',(req,res)=>{
    const refreshToken=req.body.token
    if(refreshToken==null)
        return res.sendStatus(401)
    if(!refreshTokens.includes(refreshToken))
        return res.sendStatus(403)
    jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET,(err,user)=>{
        if(err)
            return res.sendStatus(403)
        const accessToken=generateAccessToken({name:user.name})
        res.json({accessToken:accessToken})
    })
})

app.delete('/logout',(req,res)=>{
    refreshTokens=refreshTokens.filter(token=>token!==req.body.token)
    res.sendStatus(204)
})

function loadProductsFromCSV() {
  const csvPath = path.join(__dirname, 'products.csv');
  const content = fs.readFileSync(csvPath, 'utf-8');
  const records = parse(content, { columns: true, relax_column_count: true });
  return records.map((row) => {
    let images = [];
    try {
      images = typeof row.images === 'string' ? JSON.parse(row.images) : (row.images || []);
    } catch {
      images = [];
    }
    return { ...row, images: Array.isArray(images) ? images : [] };
  });
}

app.get("/products", async (req, res) => {
  try {
    const data = loadProductsFromCSV();
    return res.json(data);
  } catch (err) {
    console.error("Failed to load products from CSV:", err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

app.post('/cart', authenticateToken,async (req,res)=>{
    const items = req.body.items;
  const userId = req.body.userId; 
  console.log(items[0].productId)
    if(!userId || !items || !Array.isArray(items)){
        res.status(400).json("Invalid cart data")
    }
 try {
  const productId = items[0].productId;
  const exists = await Cart.findOne({
    userId,
    'items.productId': productId
  });

  if (exists) {
    const quantity=items[0].quantity;
    const updatedCart = await Cart.findOneAndUpdate(
      { userId, 'items.productId': productId },
      { 'items.$.quantity': quantity}, 
      { new: true }
    );
res.status(201).json({ message: "Cart saved successfully" });
    return updatedCart;
}else{
        const cart=new Cart({userId,items})
        await cart.save();
        res.status(201).json({ message: "Cart saved successfully" });
        return cart;
}

    }catch (err) {
    console.error("Error saving cart:", err);
    res.status(500).json({ message: "Error saving cart" });
  }
})

app.get('/cart/:userid',async (req,res)=>{
     const userId = req.params.userid;
     try{
        const cartItems=await Cart.find({userId})
        const productIds = cartItems.flatMap(cart => 
      cart.items.map(item => ({productId: item.productId,quantity: item.quantity})) // Assuming item has productId
    );
    res.json(productIds);
     }
     catch(err){
        console.error(err)
     }
})

app.delete('/cart/:userId/:productId',async (req,res)=>{
 const { userId, productId } = req.params;
  try{
       const deleted = await Cart.findOne({
  userId: userId,
  'items.productId': productId
});
       if (deleted) {
    const updatedCart = await Cart.findOneAndDelete({
  userId: userId,
  'items.productId': productId
});

    res.status(200).json({ message: 'Item removed from cart' });
    return updatedCart;
  
} else {
   res.status(404).json({ 
  message: 'Item not found in cart.',userId,productId});
  }
  }
  catch(err){
    console.error(err);
  }
})


function authenticateToken(req,res,next){
  try{
  console.log(req.userId)
    const authHeader=req.headers['authorization']
    const token=authHeader && authHeader.split(' ')[1]
    console.log(token)
  if (!token) return res.sendStatus(401).json({message:'Please login first'});

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403).json({message:'Your session has expired. Please log in again.'});
    req.user = user;
    next();
  });}
  catch(err){
    console.log(err);
  }
}

function generateAccessToken(user){
    return jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'15m'})
}

app.listen(3000)