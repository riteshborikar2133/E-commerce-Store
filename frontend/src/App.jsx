import { Toaster } from 'react-hot-toast'
import './App.css'
import Home from './pages/Homepage/Home'
import Login from './pages/Loginpage/Login'
import Signup from './pages/Signuppage/Signup'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './context/AuthContext'
import Product from './pages/Productpage/Product'
import Sellerlogin from './pages/Loginpage/Sellerlogin'
import Sellerhome from './pages/SellerHomepage/Sellerhome'
import Buypage from './pages/Buypage/Buypage'
import { useEffect } from 'react'
import Productlist from './pages/ProductList/Productlist'
import Cart from './pages/Cartpage/Cart'
import SellerSignup from './pages/Signuppage/SellerSignup'
function App() {
  const { authUser } = useAuthContext()
  useEffect(() => {

  }, [authUser])
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={(!authUser.storename) ? <Home /> : <Sellerhome />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          {/* <Route path='/home' element={authUser ? <Home /> : <Navigate to='/' />} /> */}
          <Route path='/productlist' element={<Productlist />} />
          <Route path='/product' element={<Product />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/buy' element={<Buypage />} />



          <Route path='/seller' element={<Sellerlogin />} >
          </Route>
          <Route path='/sellersignup' element={<SellerSignup />} />
          <Route path='/seller/homepage/*' element={(authUser.storename) ? <Sellerhome /> : <Sellerlogin />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </>
  )
}

export default App
