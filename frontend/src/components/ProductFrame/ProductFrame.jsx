import React, { useEffect, useState } from 'react'
import './ProductFrame.css'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuthContext } from '../../context/AuthContext';
import toast from 'react-hot-toast';

export default function ProductFrame(props) {

  const [product, setProduct] = useState([]);
  const [review, setReview] = useState([])
  const { authUser } = useAuthContext()

  const { state } = useLocation();
  const { data } = state;
  const navigate = useNavigate();




  const getproduct = async (req, res) => {
    const r = await axios.get(`http://localhost:8080/api/product/viewProduct/${data}`)
      .then((e) => {
        console.log(e.data)
        setProduct(e.data.product)
        setReview(e.data.review)
        // console.log(review.length)
        // console.log(product)
      })
  }

  const handleBuy = () => {
    navigate('/buy', { state: { product: product } })
  }


  const carts = {
    "productId": data,
    "productName": product.name,
    "productImg": product.image,
    "productPrice": product.price,
    "userId": authUser.id
  }


  const cart = async () => {
    console.log(carts)
    const r = await axios.post(`http://localhost:8080/api/user/cart`, carts)
      .then((e) => {
        console.log(e)
        toast.success(e.data.message)
      })
  }


  useEffect(() => {
    getproduct()
  }, [])

  return (
    <div className="productframe">
      <div className="frameleft">
        <img src={product.image} alt="" />
      </div>
      <div className="frameright">
        <h1>{product.name}</h1>
        <p><span className='rating'>4.5</span> Rating</p>
        <h1>₹ {product.price}/-</h1>
        <div className="button">
          <button className='cart' onClick={cart}>Add to Card</button>
          <button className='buy' onClick={handleBuy}>Buy Now</button>

        </div>
        <h3>Features</h3>
        <div className="featureframe">
          <div className="feature">
            <i className="fa-solid fa-truck"></i>
            <p>Cash on Delivery</p>
          </div>
          <div className="feature">
            <i className="fa-solid fa-building"></i>
            <p>7 Days Service Center Replacement</p>
          </div>
          <div className="feature">
            <i className="fa-solid fa-money-bill"></i>
            <p>GST invoice available</p>
          </div>
        </div>
        <h3>Desciption</h3>
        <p className="desc">
          {product.description}
        </p>

        <h3>Reviews</h3>
        {
          (review.length === 0) ? (
            < div className="reviewemail">No review</div>
          ) : (
            <div className="reviewframe">
              <div className="reviewemail">xyz@gmail.com</div>
              <div className="reviewrating">Rating : 3.2</div>
              <div className="reviewtext">Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus sequi perferendis blanditiis.</div>
            </div>
          )
        }
      </div>
    </div >
  )
}
