import './App.css';
import React, { useState,useEffect } from 'react'
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import { Route, Routes } from 'react-router-dom';
import Cart from './pages/Cart/Cart';
import Home from './pages/Home/Home';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import LoginPopUp from './components/LoginPopUp/LoginPopUp';
import SignupPopUp from './components/SignupPopUp/SignupPopUp';
import ProfilePopUp from './components/ProfilePopUp/ProfilePopUp';
import YourOrder from './pages/YouOrders/YourOrder';
const App =() => {
  const [calllogin,setcalllogin]=useState(false);
  const [callprofile,setcallprofile]=useState(false);
  const [callsignup,setsignup]=useState(false);
  const [loggedin,setloggedin]=useState(false);
  const [email,setemail]=useState("");
  
  return (
    <>
    {callprofile? <ProfilePopUp setloggedin={setloggedin} email={email} setcallprofile={setcallprofile}/>:null}
    {calllogin ? <LoginPopUp setcalllogin={setcalllogin} setsignup={setsignup} setloggedin={setloggedin}  /> : null}
    {callsignup ? <SignupPopUp setcalllogin={setcalllogin} setsignup={setsignup} /> : null}
    <div>
      <Navbar setcalllogin={setcalllogin} setemail={setemail} setcallprofile={setcallprofile} setloggedin={setloggedin} loggedin={loggedin}/>
      <Routes>
        <Route path='/' element={<Home loggedin={loggedin} email={email}/>}></Route>
        <Route path='/cart' element={<Cart/>}></Route>
        <Route path='/yourorders' element={<YourOrder  email={email}/>}></Route>
        <Route path='/placeorder' element={<PlaceOrder/>}></Route>
      </Routes>
      <Footer/>
    </div>
    </>
  )
}

export default App;