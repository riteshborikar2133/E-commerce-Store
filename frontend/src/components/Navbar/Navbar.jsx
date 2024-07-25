import React from 'react'
import './Navbar.css'
import { useAuthContext } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom'
import useLogout from '../../Hooks/useLogOut';
import axios from 'axios';
import toast from 'react-hot-toast';
function Navbar() {

    const { authUser, setAuthUser } = useAuthContext();
    const { logouts } = useLogout();

    const log = async () => {
        // 
        await logouts();
    }

    const handleLogout = async () => {
        log();
    }

    const navigate = useNavigate();
    const redirect = (type) => {
        console.log(type)
        const product = type;
        navigate('/productlist', { state: { type: product } })
    }
    return (
        <>
            <nav>
                <div className="navlogo">
                    <Link to='/'>
                        <h3>
                            ER
                        </h3>
                    </Link>
                </div>
                <div className="navsearch">
                </div>
                <div className="navbutton">
                    <input type="text" placeholder='Search' />
                    <button><i className="fa-solid fa-magnifying-glass"></i></button>
                    {
                        (!authUser) ? (
                            <>
                                <span><Link to="/login">Login</Link></span>
                                <span><a href="">Signup</a></span>
                            </>
                        )
                            : (
                                <>
                                    <span><a href="/cart">Cart</a></span>
                                    <span><i className="fa-solid fa-user"></i></span>
                                    <span><button onClick={handleLogout}>logout</button></span>
                                </>
                            )
                    }
                </div>
            </nav>
            <div className="catbar">
                <div className='navopt' onClick={(e) => { redirect('Mobile') }}>Mobile</div>
                <div className='navopt' onClick={(e) => { redirect('Home Appliances') }}>Appliances</div>
                <div className='navopt' onClick={(e) => { redirect('Electronics') }}>Electronics</div>
                <div className='navopt' onClick={(e) => { redirect('Fashion') }}>Fashion</div>
            </div>
        </>
    )
}

export default Navbar
