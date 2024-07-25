import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import Seller from "../models/sellerModel.js";

// insert Product 
export const createProduct = async (req, res) => {
    try {
        const { name, price, description, image, seller, producttype } = req.body;
        // const seller = req.user._id;

        const findseller = await Seller.findById(seller);
        if (!findseller) {
            return res.status(400).json({ error: "seller account not found" })
        }

        const selleracc = new Product({
            name,
            price,
            seller,
            description,
            image,
            producttype
        })

        if (selleracc) {
            await selleracc.save();
            return res.status(200).json({ message: "Product created" })
        }

    } catch (error) {
        console.log("error in product Controller: ", error)
        res.status(500).json({ error: "Internal server error at cont" });
    }

}



export const allProduct = async (req, res) => {
    try {
        const id = req.params._id;
        if (!id) {
            return res.status(400).json({ error: "invalid" })
        }

        const productlist = await Product.find({ seller: id });
        if (!productlist) {
            return res.status(400).json({ error: "no product" })
        }
        return res.status(200).json({ productlist })

    } catch (error) {
        console.log(error)
    }
}


export const review = async (req, res) => {
    try {

        const productId = req.params.id;
        const { rating, comment } = req.body;
        const userId = req.user._id;
        const product = await Product.findById(productId)
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const newReview = {
            user: req.user._id,
            email: req.user.email,
            rating,
            comment
        }

        product.review.push(newReview);
        await product.save();
        res.status(200).json({ message: "Review added Successfully", product })
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
        console.log(error)
    }


}

export const allProuctforView = async (req, res) => {
    try {
        const response = await Product.find();
        if (response) {
            return res.status(200).json({ response });
        }
        return res.status(400).json({ error: "error" })
    } catch (error) {
        console.log(error)
    }
}


export const viewProduct = async (req, res) => {
    try {
        const productId = req.params.id;

        const product = await Product.findById(productId)
        if (product) {
            return res.status(200).json({ product, review: product.review })
        }
        return res.status(400).json({ error: "no product found" })

    } catch (error) {
        console.log(error)
    }
}


export const orderProduct = async (req, res) => {
    try {

        const { productName,
            productId,
            sellerId,
            userId,
            address,
            quantity,
            paymentMethod,
            totalPrice,
            contactDetail } = req.body


        const order = new Order({
            productName,
            productId,
            sellerId,
            userId,
            address,
            quantity,
            paymentMethod,
            totalPrice,
            contactDetail
        })

        if (!order) {
            return res.status(400).json({ error: "detail error" })
        }

        await order.save()
        return res.status(200).json({ order, message: "order placed" })

    } catch (error) {
        console.log(error)
    }
}



export const sellerOrderView = async (req, res) => {
    try {
        const sellerId = req.params._id;
        const order = await Order.find({ sellerId })
        if (order) {
            return res.status(200).json({ order })
        }
        return res.status(400).json({ error: "noo" })
    }
    catch (error) {
        console.log(error)
    }
}


