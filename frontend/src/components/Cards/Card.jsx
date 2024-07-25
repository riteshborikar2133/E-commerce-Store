import React, { useState } from 'react'
import './Card.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Card(props) {

  const [data, setData] = useState([])
  const { id } = props
  const navigate = useNavigate();
  const handleClick = async (req, res) => {
    // console.log(id)
    await setData(id)
    navigate('/product', { state: { data: id } })
    // const r = await axios.get(`http://localhost:8080/api/product/viewProduct/${id}`)
    //   .then((e) => {
    //     // console.log(e.data.product)
    //     setData(e.data.product)
    //   })
  }

  return (
    <div className="card-frame" onClick={handleClick}>
      <div className='card'>
        <div className="card-img">
          <img src={props.image} alt="Product" />
        </div>
        <div className="card-title"><span>{props.name}</span></div>
        <div className="card-text">₹{props.price}</div>
      </div>
    </div>
  )
}
