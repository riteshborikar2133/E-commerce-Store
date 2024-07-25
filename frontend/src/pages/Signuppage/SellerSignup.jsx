import React, { useState } from 'react'
import './Signup.css'
import { Link } from 'react-router-dom';
import useSellerSignUp from '../../Hooks/uesSellerSignUp';


function SellerSignup() {

    const { loading, signups } = useSellerSignUp();
    const [signup, setSignup] = useState({
        "name": "",
        "email": "",
        "password": "",
        "confirmPassword": "",
        "gender": "",
        "storename": ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(signup)
        await signups(signup)
    }

    return (
        <div className='signupform' onSubmit={handleSubmit}>
            <form>
                <h2>Seller Signup</h2>
                <div className="formfield">
                    <input type="text" name="name" id="name" value={signup.name} onChange={(e) => { setSignup({ ...signup, name: e.target.value }) }} placeholder='Name*' />

                    <input type="text" name="email" id="email" value={signup.email} onChange={(e) => { setSignup({ ...signup, email: e.target.value }) }} placeholder='Email*' />
                </div>
                <div className="formfield">
                    <input type="password" name="password" id="password" value={signup.password} onChange={(e) => { setSignup({ ...signup, password: e.target.value }) }} placeholder='Password*' />
                    <input type="password" name="confirmpassword" id="confirmpassword" value={signup.confirmPassword} onChange={(e) => { setSignup({ ...signup, confirmPassword: e.target.value }) }} placeholder='ConfirmPassword*' />
                </div>
                <div className="formfield" >
                    <input type="text" name='storename' id='storename' value={signup.storename} onChange={(e) => { setSignup({ ...signup, storename: e.target.value }) }} placeholder='Store Name*' />
                    <select name="gender" id="gender" style={{ width: '100%' }} onChange={(e) => { setSignup({ ...signup, gender: e.target.value }) }}>
                        <option value="" defaultChecked>Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
                <div className="formfield">
                    <input type="submit" value="Register" />
                    <Link to="/seller">Login</Link>
                </div>
            </form>
        </div>
    )
}

export default SellerSignup;
