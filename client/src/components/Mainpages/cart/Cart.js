import React, { useContext, useEffect, useState } from 'react'
import { Globalstate } from '../../../Globalstate';
import StripeCheckout from "react-stripe-checkout";
import "./Cart.css";
import axios from 'axios';


function Cart() {
    const state=useContext(Globalstate)
    const[cart,setcart]=state.userAPI.cart
    const[token]=state.token
    const[total,settotal]=useState(0)

    useEffect(()=>{
        const getTotal = () => {
            const total = cart.reduce((previous, item) => {
              return previous + item.price * item.quantity;
            }, 0);
            settotal(total);
          };
          getTotal();
    },[cart])

   const addTocart = async (cart) => {
        await axios.patch(
          "/user/addcart",
          { cart },
          {
            headers: { Authorization: token },
          }
        );
      };


       //adding food in cart individually//
  const increment = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity += 1;
        console.log(item);
      }
    });
    setcart([...cart]);
    addTocart(cart);
  };

  const decrement = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity === 1 ? (item.quantity = 1) : (item.quantity -= 1);
      }
    });
    setcart([...cart]);
    addTocart(cart);
  };

  //remove food from cart//

  const removefood = (id) => {
    if (window.confirm("Do you want to Delete Food")) {
      cart.forEach((item, index) => {
        if (item._id === id) {
          cart.splice(index, 1);
        }
      });
      setcart([...cart]);
      addTocart(cart);
    }
  };

  if (cart.length === 0)
  return (
    <h2 style={{ textAlign: "center", fontSize: "3rem" }}>Cart is Empty</h2>
  );

  async function handletoken(token) {
    console.log(token);
  }
  return (
    <div>
         {cart.map((food) => (
        <div className="detail cart" key={food._id}>
          <img src={food.images.url} alt="poster" />
          <div className="box-detail">
            <h2>{food.title}</h2>
            <h3><span style={{color:"red"}}>${food.price * food.quantity}</span> </h3>
            <p>{food.description}</p>
            <p>{food.content}</p>
            <div className="amount">
              <button onClick={() => decrement(food._id)}> - </button>
              <span>{food.quantity}</span>
              <button onClick={() => increment(food._id)}> + </button>
            </div>

            <div className="delete" onClick={() => removefood(food._id)}>
              {" "}
              X
            </div>
          </div>
        </div>
      ))}
       <div className="total">
        <h3>Total: $ {total}</h3>
        <StripeCheckout
              stripeKey="pk_test_51KZ7tgSCLtg0NGDAlaK5C61XEPGHKE4zH0UbTO6eGe0bd23CKV2Z6tEzWkyvA9Yf3O2Fm2hARJfc9FoshOFiNuFT00q3zNCxlL"
              token={handletoken}
              billingAddress
              amount={total*100}
            />
      </div>
    </div>
  )
}

export default Cart