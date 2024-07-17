import React, { useState } from 'react'
import { useEffect } from 'react';
import './YourOrder.css';
import { useNavigate } from 'react-router-dom';
const YourOrder = ({email}) => {
const navigate=useNavigate();

const [orders ,setorderdone]=useState([]);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const get = await fetch('http://localhost:5000/yourorders',{
              credentials:'include'
            });

            const data = await get.json();
            if(data.redirectto){
                setorderdone(data.message);
                navigate(data.redirectto);
            }
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchData();
      }, []);
    

  return (
    <div>
      <h2 className='yourorder-h2'>My Orders !</h2>
      <div className="yourorder-title">
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
      </div>
      <div className="yourorder-div">
        {orders.map((order, index) =>order.display && (
            <>
                <div key={index} className="yourorder-items">
                    <p className='yourorder-name'>{order.name}</p>
                    <p className='yourorder-price'>{order.price}</p>
                    <p className='yourorder-count'>{order.count}</p>
                </div>
                <div>
                     <hr className="yourorder-hr" />
                </div>
             </>      
        ) 
        )}
      </div>
    </div>
  )
}

export default YourOrder