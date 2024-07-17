import React from 'react'
import "./Footer.css";
import {assets} from "../../assets/assets";
const Footer = () => {
  return (
    <div className='full-foot'>
      <div className='footer-details' id='footer'>
        <div className='footer-left'>
            <div>
                <h2 className='footer-left-top'>Tomato</h2>
            </div>    
            <div className='footer-left-middle'>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequuntur voluptatibus maxime quas ipsam dolorem illo, fuga tenetur cumque ut. Facilis quasi possimus deleniti libero laborum veniam recusandae reiciendis provident at!</p>
            </div>
            <div>
                <img className='footer-left-bottom' src={assets.facebook_icon} alt="" />
                <img  className='footer-left-bottom' src={assets.twitter_icon} alt="" />
                <img className='footer-left-bottom' src={assets.linkedin_icon} alt="" />
            </div>
        </div>
        <div className='footer-middle'>
            <div className='footer-middle-top'>
                <h2>COMPANY</h2>
            </div>
            <div className='footer-middle-bottom'>
                <p>Home</p>
                <p>About us</p>
                <p>Delivery</p>
                <p>Privacy policy</p>
            </div>
        </div>
        <div className='footer-right'>
            <div className='footer-right-top'>
                <h2>Get In Touch</h2>
            </div>
            <div className='footer-right-bottom'>
                <p>+1-222-456-898</p>
                <p>contact@tomato.com</p>
            </div>
        </div>
      </div>
      <div className='footer-line'>
        <hr />
      </div>
    </div>

  )
}

export default Footer