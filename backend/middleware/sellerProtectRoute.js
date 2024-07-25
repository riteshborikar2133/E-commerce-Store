import jwt from 'jsonwebtoken'
import Seller from '../models/sellerModel.js'

const sellerProtectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ error: "Unauthorized" })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({ error: "invalid token" });
        }
        const user = await Seller.findById(decoded.id).select("-password")
        if (!user) {
            return res.status(401).json({ error: "No seller account found" })
        }
        req.user = user;
        next();

    } catch (error) {
        console.log("Error in middleware protection", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export default sellerProtectRoute;