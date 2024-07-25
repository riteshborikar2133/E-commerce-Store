import jwt  from "jsonwebtoken";

const generateTokenandCookies = (id, res) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    })

    res.cookie("jwt",token,{
        maxAge:1 * 24 * 60 * 60 * 1000,
        httpOnly:true,
        sameSite:"strict",
    })

}

export default generateTokenandCookies;