import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../context/AuthContext';
import './Cart.css'
import axios from 'axios';
import { set } from 'mongoose';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import toast from 'react-hot-toast';



export default function Cart() {

    const navigate = useNavigate()
    const { authUser } = useAuthContext()

    const [cartdata, setCartData] = useState([])

    const getcart = async () => {
        const id = authUser.id
        const r = await axios.get(`http://localhost:8080/api/user/viewcart/${id}`)
            .then((e) => {
                console.log(e.data.data);
                setCartData(e.data.data)
            })
    }


    const handleClick = (id) => {
        // console.log(id)
        // const id = id;
        navigate('/product', { state: { data: id } })
        // const r = await axios.get(`http://localhost:8080/api/product/viewProduct/${id}`)
        //   .then((e) => {
        //     // console.log(e.data.product)
        //     setData(e.data.product)
        //   })
    }

    const removeItem = async (item) => {
        console.log(item);
        const id = item.productId;
        console.log(id);

        const data = {
            userId: authUser.id,
            productId: id
        };

        console.log(data);

        try {
            const res = await axios.delete('http://127.0.0.1:8080/api/user/delcart', {
                data: data // Note that data should be inside an object
            })
            .then((e)=>{
                toast.success(e.data.message);
            })
            console.log(res);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        getcart()
    }, [])

    return (
        <>
            <Navbar />
            <div className='Cart-Container'>

                <div className="Cart-Container-left">
                    <h3>Cart</h3>
                    {
                        cartdata.map((item) => {
                            return (
                                <div className="cart" key={item._id} >
                                    <div className="cartimg">
                                        <img src={item.productImg} alt="" />
                                    </div>
                                    <div className="cartinfo">
                                        <h3 onClick={() => { handleClick(item.productId) }}>{item.productName}</h3>
                                        <h4>₹{item.productPrice}</h4>
                                        <button onClick={() => { removeItem(item) }}>Remove</button>
                                    </div>
                                </div>
                            )
                        })
                    }


                </div>



                <div className="Cart-Container-right"></div>

            </div >
            <Footer />
        </>
    )
}
