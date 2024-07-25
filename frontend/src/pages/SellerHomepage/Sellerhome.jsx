import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useAuthContext } from '../../context/AuthContext';
import './Sellerhome.css'
import SellerProductList from '../../components/SellerNavComponents/SellerProductList';
import SellerDashboard from '../../components/SellerNavComponents/DashBoard/SellerDashboard';
import { Routes, Route, NavLink } from 'react-router-dom'
import OrderDashBoard from '../../components/SellerNavComponents/OrderDashBoard/OrderDashBoard';

export default function Sellerhome() {

    const { authUser } = useAuthContext()
    const [item, setItem] = useState([])
    const [orders, setOrders] = useState([])
    const [product, setProduct] = useState({
        seller: authUser._id,
        name: '',
        price: '',
        description: '',
        image: '',
        producttype: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setProduct((prevProduct) => ({
                ...prevProduct,
                image: reader.result,
            }));
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };


    const getproduct = async () => {
        const id = authUser._id
        const r = await axios.get(`http://localhost:8080/api/product/list/${id}`)
            .then((e) => {
                // console.log(e.data.productlist)
                setItem(e.data.productlist)
                // console.log(item.length)
            })
    }


    const storeItem = async () => {
        const res = await axios.post('http://localhost:8080/api/product/create', product)
            .then((e) => {
                // console.log(e)
                alert(e.data.message)
            })
    }

    const [filterOrder, setFilterOrder] = useState(0);
    const fetchOrder = async () => {
        const id = authUser._id

        const res = await axios.get(`http://localhost:8080/api/product/sellerOrder/${id}`)
            .then((e) => {
                console.log(e.data.order)
                setOrders(e.data.order)
            })
    }


    const countNotDelivered = () => {
        return orders.filter(order => order.status === 'Not Delivered').length;
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(product);
        storeItem()
    };


    useEffect(() => {
        getproduct()
        fetchOrder()
    }, [])

    return (
        <>
            <div className="dashboard">
                <div className="dashboard-left">
                    <div className="sellerinfo">
                        <img src={authUser.profilePic} alt={authUser.name} />
                        <h3>{authUser.name}</h3>
                        <p>{authUser.storename}</p>
                        <p>{authUser.email}</p>
                        <p>{authUser._id}</p>
                        <hr />
                    </div>
                    <div className="productlist">
                        <div className="navbar">
                            <NavLink to='dashboard' activestyle={{ color: '#5754a8' }} className='navitem'>Dashboard</NavLink>
                            <NavLink to='products' activestyle={{ color: '#5754a8' }} className='navitem'>Product List</NavLink>
                            <NavLink to='orders' activestyle={{ color: '#5754a8' }} className='navitem'>Orders</NavLink>
                        </div>
                        <div>
                            <Routes>
                                <Route exact path='dashboard' element={<SellerDashboard productlength={item.length} orderlength={orders.length} deliverylength={countNotDelivered()} />} />
                                <Route path='products' element={<SellerProductList item={item} />} />
                                <Route path='orders' element={<OrderDashBoard item={orders} />} />

                            </Routes>
                        </div>

                        {/* <SellerProductList /> */}
                    </div>
                </div>
                <div className="dashboard-right">
                    <div className="product-from">
                        <h1>Create Product</h1>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label>
                                    Name:
                                    <input
                                        type="text"
                                        name="name"
                                        value={product.name}
                                        onChange={handleInputChange}
                                    />
                                </label>
                            </div>
                            <div>
                                <label>
                                    Price:
                                    <input
                                        type="number"
                                        name="price"
                                        value={product.price}
                                        onChange={handleInputChange}
                                    />
                                </label>
                            </div>
                            <div>
                                <label>
                                    Type:
                                    <select name="producttype" value={product.producttype} onChange={handleInputChange}>
                                        <option value="">Select Type</option>
                                        <option value="Electronics">Electronics</option>
                                        <option value="Fashion">Fashion</option>
                                        <option value="Mobile">Mobile</option>
                                        <option value="Home Appliances">Home Appliances</option>
                                    </select>
                                </label>
                            </div>
                            <div>
                                <label>
                                    Description:
                                    <textarea
                                        name="description"
                                        value={product.description}
                                        onChange={handleInputChange}
                                    />
                                </label>
                            </div>
                            <div>
                                <label>
                                    Image:
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                </label>
                            </div>
                            {product.image && (
                                <div>
                                    <img src={product.image} alt="Product" style={{ width: '100px' }} />
                                </div>
                            )}
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
