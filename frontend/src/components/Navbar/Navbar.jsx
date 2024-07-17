import React, { useContext, useState,useEffect } from 'react'
import {assets} from "../../assets/assets"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import {Link , useNavigate} from "react-router-dom";
// font-size: 1vw;

import "./Navbar.css";
import { StoreContext } from '../../context/StoreContext';
const Navbar = ({setcalllogin,setloggedin,setemail, loggedin,setcallprofile,navbarlinks }) => {

const {getcartdot}=useContext(StoreContext);
const [menu,setmenu]=useState("Home");

const navigate=useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://fooddel-backend-yajv.onrender.com',{
          credentials:'include'
        });
        const data = await response.json();
        if (data.redirectto === '/') {
          if(data.cookiedata){
            console.log(data.cookiedata.email);
            setemail(data.cookiedata.email);
            navigate(data.redirectto);
            setloggedin(true);
          }
          else{
            setloggedin(false);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);

const cartalert=()=>{
    if(!loggedin){
        alert("First Login Yourself!");
    }
}
  return (
    <div className='head'>
        <div className='left'>
            <Link to="/">
            <div className='logo'>
                <img src={assets.logo} alt="" />
            </div>
            </Link>
            <div className='menu'>
                <ul>
                    <a href='#home' onClick={()=>setmenu("Home")} className={menu==="Home"?"underli":" "}>Home</a>
                    <a href='#explore-menu' onClick={()=>setmenu("Menu")} className={menu==="Menu"?"underli":" "}>Menu</a>
                    <a href='#mobile-app' onClick={()=>setmenu("mobile-app")} className={menu==="mobile-app"?"underli":" "}>mobile-app</a>
                    <a href='#footer' onClick={()=>setmenu("Contact-us")} className={menu==="Contact-us"?"underli":" "}>Contact-us</a>
                </ul>
            </div>
        </div>
        <div className='right'>
            {loggedin
            ? <Link to="/cart">
            <div className='basketicon'>
                <img src={assets.basket_icon} alt="" />
                <div className={getcartdot()===0?' ':"dot"}></div>
            </div>
            </Link>
            :   <div className='basketicon'>
                <img onClick={()=>cartalert()} src={assets.basket_icon} alt="" />
                </div>
            }
            <div>
                {loggedin===true
                ?<button onClick={()=>setcallprofile(true)} className='signbutton'><FontAwesomeIcon icon={faUser} /></button>
                :<button onClick={()=>setcalllogin(true)} className='signbutton'>Sign in</button>
                }
            </div>
        </div>

    </div>
  )
}

export default Navbar
