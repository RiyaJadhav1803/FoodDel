import React, { useContext,useEffect } from 'react'
import "./PlaceOrder.css";
import { useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext';
const PlaceOrder = () => {
  const navigate=useNavigate();
  const {getcartdot}=useContext(StoreContext);
  const handlepayment= async(e)=>{
    e.preventDefault();
    let payment = await fetch(
        'https://fooddel-backend-yajv.onrender.com/placeorder', {
            method: "post",
            body: JSON.stringify(),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials:'include',
        })

        
      const data=await payment.json();
      console.log(data.redirectto);
      if(data.redirectto){
        window.location.href = data.redirectto;; 
      }
      else{
        alert("Error occured");
      }
  }

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://fooddel-backend-yajv.onrender.com/placeorder',{
          credentials:'include'
        });
        const data = await response.json();
        if (data.redirectto === '/placeorder') {
            navigate(data.redirectto);
          }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className='placeorder-page'>
      <form className='order-left' onSubmit={handlepayment}>
          <div>
              <h2 className='left-heading'>Delivery Information</h2>
          </div>
          <div className='left-names'>
            <input className='firstname' required type="text" name='firstname' placeholder='First Name'/>
            <input className='lastname' required type="text" name='lastname'  placeholder='Last Name'/>
          </div>
          <div>
            <input className='left-email' required type="email" name='email'  placeholder='Enter email'/>
            <input className='street' required type="text" name='street' placeholder='Street' />
          </div>
          <div className='left-four'>
          <input className='city' type="text" name='city' placeholder='City' />
          <input className='state' type="text" name='state' placeholder='State' />
          </div>
          <div className='left-four'>
              <input className='zipcode' type="number" name="zipcode" placeholder='Zip Code'/>
              <input className='country' type="text" name='country' placeholder='Country' />
          </div>
          <div>
            <input className='phoneno' required type="number" name='phonenumber' placeholder='Phone No'/>
          </div>
          <div>
            <button className="payment-button">Proceed To Payment</button>
          </div>
      </form>
      <div className="cart-below-block">
          <div>
            <h2 className="cart-below-heading">Cart Totals</h2>
          </div>
          <div className="cart-below-subtotal">
            <p className="cart-below-subtotal-p1">Subtotal</p>
            <p  className="cart-below-subtotal-p2">$ {getcartdot()}</p>
          </div>
          <hr className="hr-below"/>
          <div className="cart-below-delivery">
            <p className="cart-below-delivery-p1">Delivery Fee</p>
            <p className="cart-below-delivery-p2">$ {getcartdot()===0?0:2}</p>
          </div>
          <hr className="hr-below"/>
          <div className="cart-below-total">
            <p className="cart-below-total-p1">Total</p>
            <p className="cart-below-total-p2">$ {getcartdot()===0?0:getcartdot()+2}</p>
          </div>
          <hr className="hr-below"/>
      </div>
    </div>
  )
}


export default PlaceOrder
