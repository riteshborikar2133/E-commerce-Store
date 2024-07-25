import { allProduct, allProuctforView, createProduct, orderProduct, sellerOrderView, viewProduct } from "../controllers/productController.js";
import express from 'express'
import { protectRoute } from "../middleware/protectRoute.js";
import sellerProtectRoute from '../middleware/sellerProtectRoute.js';


const router = express.Router();

router.post("/create", createProduct);
router.get("/list/:_id", allProduct);
router.get("/getall", allProuctforView);
router.get('/viewProduct/:id', viewProduct);


router.post('/order', orderProduct);
router.get('/sellerOrder/:_id', sellerOrderView);


export default router;