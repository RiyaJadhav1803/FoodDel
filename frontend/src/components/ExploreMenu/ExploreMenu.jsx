import React from 'react'
import "./ExploreMenu.css";
import {menu_list} from "../../assets/assets";
const ExploreMenu = ({category,setcategory}) => {
  return (
    <div id='explore-menu'> 
        <div className='explore-headings'>
            <div className='explore-head1'>Explore Our Menu</div>
            <div className='explore-head2'>Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy the craving and elevate the dining experience.</div>
            <div className='explore-all-items'>
                {menu_list.map((item,index)=>{
                    return(
                        <div onClick={()=>setcategory(prev=>prev===item.menu_name?"ALL":item.menu_name)} key={index} className='explore-single-item'>
                            <img src={item.menu_image} alt="" />
                            <p style={{margin:"auto 2.5vw"}} className={category===item.menu_name?"activeline":" "}>{item.menu_name}</p>
                        </div>
                    )
                })}
            </div>
            <hr/>
        </div>
    </div>
  )
}

export default ExploreMenu;