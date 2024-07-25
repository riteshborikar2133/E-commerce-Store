import express from 'express'
import { addToCart, deleteCart, getAllUser, userLogin, userLogout, userSignup, viewCart } from '../controllers/authController.js'
import { protectRoute } from '../middleware/protectRoute.js';
import { review } from '../controllers/productController.js';

const router = express.Router()

router.post('/signup', userSignup);
router.get('/', getAllUser);
router.post('/login', userLogin);
router.post('/logout', userLogout);
router.post('/review/:id', protectRoute, review);
router.post('/cart', addToCart);
router.get('/viewcart/:id', viewCart);
router.delete('/delcart', deleteCart);

export default router;