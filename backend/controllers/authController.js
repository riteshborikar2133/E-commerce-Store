import Seller from "../models/sellerModel.js";
import bcrypt from 'bcryptjs'
import generateTokenandCookies from "../utils/generateTokenandCookies.js";
import User from "../models/userModel.js";

// selller section


// seller signup controller
export const sellerSignup = async (req, res) => {
    try {
        const { name, storename, password, confirmPassword, email, gender } = req.body;

        if (password != confirmPassword) {
            return res.status(400).json({ error: "password not match" })
        }

        const user = await Seller.findOne({ storename })
        if (user) {
            return res.status(400).json({ error: "Store Name already exists" })
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const boyProfile = `https://avatar.iran.liara.run/public/boy?username=${name}`
        const girlProfile = `https://avatar.iran.liara.run/public/girl?username=${name}`

        const newSeller = new Seller({
            name,
            storename,
            password: hashPassword,
            email,
            gender,
            profilePic: gender === "male" ? boyProfile : girlProfile
        })

        if (newSeller) {
            generateTokenandCookies(newSeller._id, res)
            await newSeller.save();
            res.status(200).json({
                data: {
                    _id: newSeller._id,
                    name: newSeller.name,
                    storename: newSeller.storename,
                    email: newSeller.email,
                    profilePic: newSeller.profilePic
                }
            })
        } else {
            res.status(400).json({ error: "invalid data" });
        }

    } catch (error) {
        res.status(401).json({ error: "error in seller controller", error })
    }
}



// geting all the seller
export const getAllSeller = async (req, res) => {
    try {
        const seller = await Seller.find().select(["-password", "-gender", "-createdAt"]);
        res.status(200).json(seller)

    } catch (error) {
        res.status(401).json({ error: "error in seller controller" }).then(() => {
            console.log(error)
        })
    }
}


// find one seller using id

export const oneSeller = async (req, res) => {
    try {
        const id = req.params._id;
        const sellerid = await Seller.findOne({ '_id': (id.trim()) })
        if (!sellerid) {
            console.log(id)
            return res.status(400).json({ error: "no seller id" })
        }
        return res.status(200).json({ sellerid })
    } catch (error) {
        console.log(error)
    }
}


// login for seller

export const sellerLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = Seller.findOne({ email })
            .then(user => {
                if (!user) {
                    return res.status(400).json({ error: "Invalid credential" })
                }
                bcrypt.compare(password, user.password, (err, data) => {
                    if (err) throw err
                    if (data) {
                        generateTokenandCookies(user._id, res)
                        return res.status(200).json({
                            data: {
                                _id: user._id,
                                name: user.name,
                                storename: user.storename,
                                email: user.email,
                                profilePic: user.profilePic
                            },
                            message: "login successful"
                        })
                    }
                    else {
                        return res.status(401).json({ error: "Invalid credential" })
                    }
                })
            })
    } catch (error) {
        console.log(error)
    }
}

// Seller Logout

export const sellerLogout = async (req, res) => {
    try {
        res.cookie('jwt', "", { maxAge: 0 })
        res.status(200).json({ message: "Logout Successfully" })
    } catch (error) {
        console.log("error", err.message)
        res.status(500).json({ error: "internal server error" })
    }
}


// user section

// user signup
export const userSignup = async (req, res) => {
    try {
        const { name, email, password, confirmPassword, gender, phone, address } = req.body;

        const findUser = await User.findOne({ email });
        if (findUser) {
            return res.status(400).json({ error: "User Exists" })
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const buyer = new User({
            name,
            email,
            password: hashPassword,
            gender,
            phone,
            address
        })

        if (buyer) {
            await buyer.save();
            generateTokenandCookies(buyer._id, res);
            const data = { "name": buyer.name, "email": buyer.email, "phone": buyer.phone, "address": buyer.address }
            return res.status(200).json({ message: "Sigup Successful", data })
        }
    } catch (error) {
        console.log(error);
    }
}



// all user list
export const getAllUser = async (req, res) => {
    try {
        const allUser = await User.find().select(["-password"]);
        if (allUser) {
            return res.status(200).json({
                allUser
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json({ error: "internal server error" })
    }
}



// User login
export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const loginuser = User.findOne({ email })
            .then(user => {
                if (!user) {
                    return res.status(400).json({ error: "Invalid credential" })
                }
                bcrypt.compare(password, user.password, (err, data) => {
                    if (err) throw err
                    if (data) {
                        generateTokenandCookies(user._id, res)
                        return res.status(200).json({ data: { id: user._id, name: user.name, email: user.email, address: user.address, contact: [user.phone, user.email], }, message: "Login Successful" })
                    }
                    else {
                        return res.status(401).json({ error: "Invalid credential" })
                    }
                })
            })
    } catch (error) {
        console.log(error);
    }
}

// user logout

export const userLogout = async (req, res) => {
    try {
        res.cookie('jwt', "", { maxAge: 0 })
        res.status(200).json({ message: "Logout Successfully" })
    } catch (error) {
        console.log(error)
    }
}


export const addToCart = async (req, res) => {
    try {
        const { productId, productName, productImg, productPrice, userId } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ error: "No user found" })
        }

        const data = {
            productId,
            productName,
            productImg,
            productPrice,
        }

        user.cart.push(data);
        await user.save();

        return res.status(200).json({ user, message: "Added to cart" })

    } catch (error) {
        console.log(error)
    }

}


export const viewCart = async (req, res) => {
    try {
        // const userId = req.params.id;
        const productId = req.params.id;
        const user = await User.findById(productId)
        if (!user) {
            return res.status(400).json({ error: "Nos user found" })
        }
        const data = user.cart
        return res.status(200).json({ data })

    } catch (error) {
        console.log(error)
    }
}

export const deleteCart = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        const user = await User.findByIdAndUpdate(
            userId,
            { $pull: { cart: { productId: productId } } },
            { new: true }
        );

        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        res.status(200).send({user:user,message:"Item Removed"});

    } catch (error) {
        console.log(error)
    }
}