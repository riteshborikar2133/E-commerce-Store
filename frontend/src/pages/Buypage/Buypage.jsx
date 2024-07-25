import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './Buypage.css'
import axios from 'axios';
import { useAuthContext } from '../../context/AuthContext';
import toast from 'react-hot-toast';

export default function Buypage() {

    const { authUser } = useAuthContext()
    const location = useLocation();
    const navigate = useNavigate();
    const { product } = location.state || {};
    const [sellerInfo, setSellerInfo] = useState([]);
    const [quantity, setQuantity] = useState()
    const [card, setCard] = useState(false);
    const [info, setinfo] = useState({
        productName: product.name,
        productId: product._id,
        sellerId: product.seller,
        userId: authUser.id,
        address: '',
        quantity: '',
        paymentMethod: '',
        totalPrice: '',
        contactDetail: authUser.contact
    })

    const getseller = async () => {
        const r = await axios.get(`http://localhost:8080/api/seller/${product.seller}`)
            .then((e) => {
                // console.log(e)
                setSellerInfo(e.data.sellerid);
            })
        console.log(sellerInfo)
        // await setinfo({ ...info, sellerId: sellerInfo._id })
    }

    const orderProduct = async () => {
        const r = await axios.post('http://localhost:8080/api/product/order', info)
            .then((e) => {
                // console.log(e)
                toast.success(e.data.message)
                navigate('/')
            })
    }

    const handleProcced = async (e) => {
        e.preventDefault();
        // let total = ;
        // setinfo({ ...info, totalPrice: total })
        console.log(info)
        orderProduct()
    }


    useEffect(() => {
        console.log(product)
        if (!product) {
            navigate('/');
        }
        getseller()
        // console.log(product)
    }, [])

    return (
        <div className='buyframe'>
            <div className="buyleft">
                <div className="buyproduct">
                    <div className="productimg">
                        <img src={product.image} alt="" />
                    </div>
                    <div className="productinfo">
                        <h4>Product Name</h4>
                        <p>{product.name}</p>
                        <h4>Product Seller</h4>
                        <p>{sellerInfo.storename}</p>
                        <h4>Product Price</h4>
                        <p>{product.price}</p>
                    </div>
                </div>
                <form className="buyform" onSubmit={handleProcced}>
                    <label htmlFor="Address">Address of Delivery</label>
                    <input type="text" id='address' placeholder='Address*' value={info.address} onChange={(e) => { setinfo({ ...info, address: e.target.value }) }} />
                    <label htmlFor="quantity">Quantity</label>
                    <input type="number" id='quantity' value={info.quantity} onChange={(e) => { setinfo({ ...info, quantity: e.target.value, totalPrice: (e.target.value) * (product.price) }) }} />
                    <label htmlFor="">Mode of Payment</label>
                    <select name="method" id="method" onChange={(e) => { setinfo({ ...info, paymentMethod: e.target.value }) }} value={info.paymentMethod}>
                        <option value="">Choose Payment Method</option>
                        <option value="Card">Card</option>
                        <option value="CashOnDelivery">CashOnDelivery</option>
                    </select>
                    <button type='submit'>Procced</button>
                </form>

            </div>
            <div className="buyright">
                <div className="productbill">
                    <table>
                        <tr>
                            <th>Item</th>
                            <th>Quantiy</th>
                            <th>Price</th>
                        </tr>
                        <tr>
                            <td>{product.name}</td>
                            <td>{info.quantity}</td>
                            <td>{(info.quantity) ? (info.quantity * product.price) : (product.price)}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    )
}
