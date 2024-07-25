import express from 'express'
import { getAllSeller, oneSeller, sellerLogin, sellerLogout, sellerSignup } from '../controllers/authController.js'
import sellerProtectRoute from '../middleware/sellerProtectRoute.js';


const router = express.Router();

router.post("/signup", sellerSignup);
router.get("/", getAllSeller);
router.post("/login", sellerLogin);
router.get("/logout", sellerProtectRoute, sellerLogout);
router.get('/:_id', oneSeller);
export default router