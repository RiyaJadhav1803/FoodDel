import React, { useState } from 'react'
import"./LoginPopUp.css"
import { useNavigate } from 'react-router-dom';
const LoginPopUp = ({setcalllogin,setsignup,setloggedin}) => {
  const [email,setemail]=useState("");
  const [password,setpassword]=useState("");
  const navigate=useNavigate();

const handleOnSubmit = async (e) => {
    e.preventDefault();

    let loginpost = await fetch(
        'http://localhost:5000/login', {
            method: "post",
            body: JSON.stringify({email,password}),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials:'include',
        })

      const data=await loginpost.json();
      if(data.redirectto==="/"){
        setcalllogin(false);
        setloggedin(true);
        navigate(data.redirectto);
      }
      else{
        setcalllogin(true);
        alert("User not registered");
      }
}
  return (
    <div  className='Login-form-div' >
        <form className='Login-form' onSubmit={handleOnSubmit} >
            <div className='login-div' >
              <div>
                <p className='login-text'>Login</p>
              </div>
              <div className='cross' onClick={()=>{setcalllogin(false); setsignup(false)}}>
                x
              </div>
            </div>
            <input required className='email' type="email" onChange={(e)=>setemail(e.target.value)} name='email' placeholder='Enter your email'/>
            <input required className='password' type="password" onChange={(e)=>setpassword(e.target.value)} name="password" placeholder='Enter password' />
            <div className='checkbox'>
              <input required className='checkbox-box' type="checkbox" name='checkbox'/>
              <p className='checkbox-text'>By continuing, I agree to the terms of use & private policy</p>
            </div>
            <button className='two-buttons'>Login</button>
            {/* <Link to='/signup'> */}
              <div className='links'>
              <p className='new-account' onClick={()=>{setcalllogin(false); setsignup(true)}} >New? Create Account</p>
              </div>
            {/* </Link> */}
        </form>
    </div>
  )
}
 
export default LoginPopUp