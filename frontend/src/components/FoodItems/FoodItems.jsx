import React ,{useContext}from 'react'
import { assets } from '../../assets/assets';
import "./FoodItems.css";
import { StoreContext } from '../../context/StoreContext';

const FoodItems = ({ email,id,name,image,description,price,loggedin }) => {
    const {items,addToCart,removeFromCart}=useContext(StoreContext); 
    const add=async (id)=>{
        const status=true;
        if(loggedin){
            addToCart(id);
            let payment = await fetch(
                'http://localhost:5000/fooditems', {
                    method: "post",
                    body: JSON.stringify({email,status,name,price,description}),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials:'include',
                })

                const data=payment.json();
                if(data.message){
                    console.log(data.message);
                }
        }
        else{
            alert("First Login Your account");
        }
    }

    const removedata=async(id)=>{
        const status=false;
        if(loggedin){
            removeFromCart(id);
            let payment = await fetch(
                'http://localhost:5000/fooditems', {
                    method: "post",
                    body: JSON.stringify({email, status,name,price,description}),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials:'include',
                })
            // console.log(status,id,name,price,description);
        }
        else{
            alert("First Login Your account");
        }
    }


  return (
    <div>
        <div className="individual"> 
        <div className='fooddisplay-image-container'>
            <img className='fooddisplay-image' src={image} alt="" />
            {!items[id]
            ?<img className='zero-count-image' onClick={()=>add(id)} src={assets.add_icon_white}></img> 
            :<div className='plus-click'>
            <img className='plus-click-plus' onClick={()=>removedata(id)} src={assets.remove_icon_red} alt="" />
            <p className='plus-click-text'>{items[id]}</p>
            <img className='plus-click-minus' onClick={()=>add(id)} src={assets.add_icon_green} alt="" />
            </div>
            }
        </div>
        <div className='food-name'>
            <p className='food-name'>{name}</p>
            <div className='food-stars'>
               <img className='food-stars' src={assets.rating_starts} alt="" />
            </div>
        </div>
        <div className='food-description'>
            <p>{description}</p>
        </div>
        <div className='food-price'>
            <p>${price}</p>
        </div>
        </div> 
    </div>
  )
}

export default FoodItems