import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'


export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ error: "Unauthorized token" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ error: "invalid Token" });
        }

        const user = await User.findById(decoded.id).select("-password")
        if (!user) {
            return res.status(404).json({ error: "user not found" })
        }
        
        req.user = user;
        next();

    } catch (error) {
        console.log("Error in middleware protection", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}