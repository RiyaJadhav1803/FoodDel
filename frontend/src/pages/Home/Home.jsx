import React, { useState } from 'react'
import "./Home.css";
import Header from '../../components/Header/Header';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';

const Home = ({loggedin,email}) => {

  const [category,setcategory]=useState("ALL");
  
  return (
    <div>
     <Header/>
     <ExploreMenu category={category} setcategory={setcategory}/>
     <FoodDisplay  email={email} loggedin={loggedin} category={category}/>
    </div>
  )
}

export default Home