import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
const SignupPopUp = ({setcalllogin,setsignup}) => {

  const [email,setemail]=useState("");
  const [password,setpassword]=useState(""); 
const handleOnSubmit = async (e) => {
    e.preventDefault();

    let loginpost = await fetch(
        'http://localhost:5000/signup', {
            method: "post",
            body: JSON.stringify({email,password}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data=await loginpost.json();
        if(data.redirectto==='/login'){
          setcalllogin(true);
          setsignup(false);
          alert("User Registered Successfully");
        }
        else{
          setcalllogin(false);
          setsignup(true);
          alert("email already exist");
        }
}


  return (
    <div  className='Login-form-div' >
        <form className='Login-form' onSubmit={handleOnSubmit}>
            <div className='login-div' >
              <div>
                <p className='login-text'>Sign-up</p>
              </div>
              <div onClick={()=>{setcalllogin(false) ; setsignup(false)}} className='cross'>
                x
              </div>
            </div> 
            <input className='name' type="text" required name="name" placeholder='Enter Name' />
            <input className='email' type="email" onChange={(e)=>setemail(e.target.value)} name='email'  required pattern="[a-zA-Z0-9]+@gmail\.com" title="Please enter a valid Gmail address (e.g., user@gmail.com)" placeholder='Enter your email'/>
            <input className='password' onChange={(e)=>setpassword(e.target.value)} type="password" name="password"  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}" required  title="Please enter a Strong Password (e.g.,Uppercase,Lowercase,Special Character & atleast one digit)" placeholder='Enter password' />
            <div className='checkbox'>
              <input required className='checkbox-box'  type="checkbox" name='checkbox'/>
              <p className='checkbox-text'>By continuing, I agree to the terms of use & private policy</p>
            </div>
            <button className='two-buttons'>Sign-up</button>
            {/* <Link to='/login'> */}
                <div onClick={()=>{setcalllogin(true) ; setsignup(false)}} className='links'>
                <p className='login-link'>Already Have an Account ? Login Here</p>
                </div>
            {/* </Link> */}
        </form>
    </div>
  )
}
 
export default SignupPopUp