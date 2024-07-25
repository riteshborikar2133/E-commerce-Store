import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import connectToDatabase from './db/connectToDatabase.js';
import sellerRoutes from './routes/sellerRoutes.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cors from 'cors'


const app = express();
app.use(express.json());
app.use(cookieParser())
app.use(cors());
dotenv.config()
const PORT = process.env.PORT || 8998

app.use("/api/seller", sellerRoutes)
app.use("/api/user", userRoutes)
app.use("/api/product", productRoutes)

app.listen(PORT, () => {
    connectToDatabase()
    console.log(`running server on port ${PORT}`)
})
