import React,{useContext}from 'react'
import { StoreContext } from '../../context/StoreContext'
import "./FoodDisplay.css";
import FoodItems from '../FoodItems/FoodItems';

const FoodDisplay = ({category ,loggedin,email}) => {
    const {food_list}=useContext(StoreContext);
  return (
    <div>
        <div className='headings'>
            <p>Top Dishes Near You!</p>
        </div>
        <div className='full'>
            {food_list.map((food,index)=>{
                  if(category==="ALL" || category===food.category){
                    return (
                        <FoodItems email={email} loggedin={loggedin} key={index} id={food._id} name={food.name} image= {food.image} description={food.description} price={food.price}/>
                    )
                  }
            })}
        </div> 
    </div>
  )
}

export default FoodDisplay;
