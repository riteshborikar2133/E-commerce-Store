import React from 'react'
import './SellerDashboard.css'


export default function SellerDashboard(props) {
    return (
        <div className='productlist'>
            <h3>DashBoard</h3>
            <hr />

            <div className="sellercardholder">
                <div className="sellercard">
                    <div className="card-reading">
                        <h3>{props.productlength}</h3>
                    </div>
                    <div className="card-description">
                        Number of product.
                    </div>
                </div>
                <div className="sellercard">
                    <div className="card-reading">
                        <h3>{props.orderlength}</h3>
                    </div>
                    <div className="card-description">
                        Total Orders.
                    </div>
                </div>
                <div className="sellercard">
                    <div className="card-reading">
                        <h3>{props.deliverylength}</h3>
                    </div>
                    <div className="card-description">
                        Order for Delivery.
                    </div>
                </div>
            </div>
        </div>
    )
}
