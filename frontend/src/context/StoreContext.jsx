import React, {createContext, useEffect, useState} from 'react';
import {food_list} from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider=(props)=>{

    const [items,setitem]=useState({ });

    const addToCart=(itemid)=>{
        if(!items[itemid]){
            setitem((prev)=>({...prev,[itemid]:1}));
        }
        else{
            setitem((prev)=>({...prev,[itemid]:prev[itemid]+1}));
        }
    }
    
    const removeFromCart=(itemid)=>{
        setitem((prev)=>({...prev,[itemid]:prev[itemid]-1}));
    } 

    const getcartdot =()=>{
        let totalprice=0;
        for(let item in items){
            if( items[item]>0){
                let profound=food_list.find((pro)=>pro._id===item);
                 totalprice+=(profound.price * items[item]);
            }
        }
        return totalprice;
    }

    const value={
        food_list,
        items,
        setitem,
        addToCart,
        removeFromCart,
        getcartdot,
    }
    return(
        <StoreContext.Provider value={value}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;