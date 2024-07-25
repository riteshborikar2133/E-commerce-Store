import React, { useEffect, useState } from 'react'
import './Login.css'
import { Link } from 'react-router-dom';
// import useLogin from '../../Hooks/useLogIn';
import useSellerlogin from '../../Hooks/useSellerLogIn';
import { useAuthContext } from '../../context/AuthContext';

function Sellerlogin() {
    const { authUser } = useAuthContext();
    const { sellerlogin } = useSellerlogin();
    const [login, setLogin] = useState({
        "email": "",
        "password": ""
    });


    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(login)
        await sellerlogin(login);
    }


    const checklogin = async () => {
        if (authUser) {
            const { email, password } = authUser;
            // console.log(authUser)
            setLogin({ email })
            // console.log(login)
        }
        else {
            setLogin({
                "email": "",
                "password": ""
            })
        }
    }

    useEffect(() => {
        checklogin();
    }, [])

    return (
        <div className='loginform' onSubmit={handleSubmit}>
            <form>
                <h2>Seller Login</h2>
                <div className="formfield">
                    <input type="text" name="email" id="email" value={login.email} onChange={(e) => { setLogin({ ...login, email: e.target.value }) }} placeholder='Email*' />
                </div>
                <div className="formfield">
                    <input type="password" name="password" id="password" value={login.password} onChange={(e) => { setLogin({ ...login, password: e.target.value }) }} placeholder='Password*' />
                    <Link to="/sellersignup" style={{ textAlign: 'left', color: 'black' }}>Don't have account</Link>
                </div>
                <div className="formfield">
                    <input type="submit" value="Login " />
                </div>
            </form>
        </div>
    )
}

export default Sellerlogin;
