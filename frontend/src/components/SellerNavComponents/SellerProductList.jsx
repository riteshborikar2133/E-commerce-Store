import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../context/AuthContext'


export default function SellerProductList(props) {
   

    return (
        <div className="productlist">
            <h3>Products</h3> 
            <hr />
            {props.item.map((item) => {
                return (
                    <div className="productcard" key={item._id}>
                        <div className="cardimg">
                            <img src={item.image} alt={item._id} />
                        </div>
                        <div className="carddetail">
                            <h4>{item.name}</h4>
                            <p>{item.price}</p>
                            <p>{item.description}</p>
                            <button>Delete</button>
                            {/* <button>Edit</button> */}
                        </div>
                    </div>
                )
            })
            }
        </div>
    )
}
