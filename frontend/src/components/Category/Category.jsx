import React from 'react'
import './Category.css'
import { useNavigate } from 'react-router-dom'
export default function Category() {

    const navigate = useNavigate();
    const redirect = (type) => {
        console.log(type)
        const product = type;
        navigate('/productlist', { state: { type: product } })
    }

    return (
        <div className="category">
            <h2>Shop by cateogry</h2>
            <div className='category-frame'>
                <div className="category-card" onClick={(e) => { redirect('Electronics') }}>
                    <i class="fa-solid fa-laptop"></i>
                    <p>Electronics</p>
                </div>
                <div className="category-card" onClick={(e) => { redirect('Fashion') }}>
                    <i class="fa-solid fa-shirt"></i>
                    <p>Fashion</p>
                </div>
                <div className="category-card" onClick={(e) => { redirect('Mobiles') }}>
                    <i class="fa-solid fa-mobile-screen-button"></i>
                    <p>Mobiles</p>
                </div>
                <div className="category-card" onClick={(e) => { redirect('Home Appliances') }}>
                    <i class="fa-solid fa-house"></i>
                    <p>Home Appliances</p>
                </div>

            </div>
        </div>
    )
}
