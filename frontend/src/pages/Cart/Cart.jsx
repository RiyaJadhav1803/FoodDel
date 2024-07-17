import React, { useContext,useEffect } from "react";
import { Link ,redirect,useNavigate } from "react-router-dom";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
const Cart = () => {
const navigate=useNavigate();
  const { food_list, items, removeFromCart,getcartdot } = useContext(StoreContext);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://fooddel-backend-yajv.onrender.com/cart',{
          credentials:'include'
        });

        const data = await response.json();
        if (data.redirectto === '/cart') {
              navigate(data.redirectto);
          }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const removedata=async(id,name)=>{
    const status=false;
        removeFromCart(id,name);
        let payment = await fetch(
            'https://fooddel-backend-yajv.onrender.com/cart', {
                method: "post",
                body: JSON.stringify({status,name}),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials:'include',
            })
        console.log(status,name);
}
  return (
    <div>
      <div className="cart-headings">
        <p>Item</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>

      <div className="cart-food-items">
        {food_list.map((food, index) => {
              if (items[food._id] > 0) {
                return (
                  <>
                  <div key={index} className="cart-single-items">
                        <div>
                          <img  className="cart-image" src={food.image} alt="" />
                        </div>
                        <div>
                          <p name='name' className="cart-name">{food.name}</p>
                        </div>
                        <div>
                          <p name='price' className="cart-price">{food.price}</p>
                        </div>
                        <div>
                          <p name='quantity' className="cart-quantity">{items[food._id]}</p>
                        </div>
                        <div>
                          <p name='total' className="cart-total-price">{food.price * items[food._id]}</p>
                        </div>
                        <div>
                          <p className="cart-cross" onClick={() => removedata(food._id,food.name)}>X</p>
                        </div>
                  </div>
                  <div>
                    <hr className="hr" />
                  </div>
                  </>
                );
              }
            })}
      </div>
      <br />
      <br />
      <br />
      <br />
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
          <div>
            <Link to="/placeorder">
            <button className="cart-below-button">Proceed To Checkout</button>
            </Link>
          </div>
      </div>
    </div>
  );
};

export default Cart;
