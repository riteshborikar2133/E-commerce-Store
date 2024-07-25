import React from 'react'

export default function OrderDashBoard(props) {
    return (
        <div className="productlist">
            <h3>Orders</h3>
            <hr />
            {props.item.map((item) => {
                return (
                    <div className="productcard" key={item._id} style={{ lineHeight: '2rem' }}>
                        <div className="carddetail">
                            <h4>Product Name : {item.productName}</h4>
                            <p>Quantity: {item.quantity}</p>
                            <p>TotalPrice: {item.totalPrice}</p>
                            <p>Payment Method: {item.paymentMethod}</p>
                        </div>
                        <div className="carddetail">
                            <p>User Id: {item.userId}</p>
                            <p>Address: {item.address}</p>
                            <p> <i className="fa-solid fa-phone"></i> {item.contactDetail[0]}  </p>
                            <p> <i className="fa-solid fa-envelope"></i> {item.contactDetail[1]}  </p>
                        </div>
                        <h4 style={{ textAlign: 'center' }}>{item.status}</h4>
                    </div>
                )
            })
            }
        </div>
    )
}
