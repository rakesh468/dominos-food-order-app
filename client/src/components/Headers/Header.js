import React,{useContext,useState} from 'react';
import { Globalstate } from '../../Globalstate';
import axios from 'axios';
import {Link} from "react-router-dom";
import menu from "./icons/menu.svg";
import close from "./icons/close.svg";
import Cart from "./icons/cart.svg";
import "./Header.css";




function Header() {
    const state=useContext(Globalstate)

    const [isLogged]=state.userAPI.isLogged
    const[isAdmin]=state.userAPI.isAdmin
    const[cart]=state.userAPI.cart
    const[Menu,setMenu]=useState(false)


    const logoutUser=async()=>{
        await axios.get("/user/logout")
        localStorage.removeItem("firstlogin")
        window.location.href="/";
    }

    const adminRouter=()=>{
        return(
          <>
          <li><Link to="/create_food"><h4>Create Food</h4></Link></li>
          <li><Link to="/category"><h4>Categories</h4></Link></li>
          </>
        )
      }

      const loggedRouter=()=>{
        return(
          <>
          
          <li><Link to="/" onClick={logoutUser}><h4>Logout</h4></Link></li>
          </>
        )
      }

      const stylemenu={
        left: Menu ? 0 :"-100%"
      }

  return (
    <header>
      <div className="menu" onClick={()=>setMenu(!Menu)}>
        <img src={menu} alt="menu-bar" width="30" />
      </div>
      <div className="logo">
      <h1>
        <Link to="/">
          {isAdmin ? (
            "Admin"
          ) : (
            <img
              src="https://res.cloudinary.com/projectsite/image/upload/v1648967313/food/Logo_fo155x.png"
              className="Logo"
              alt="logo"
            />
          )}
        </Link>
      </h1>
    </div>
     
     {
       isAdmin ? " "
         : <div className="cart-icon">
          <span>{cart.length}</span>
          <Link to="/cart">
            <img src={Cart} alt="" width="30" />
          </Link>
        </div>
       

     }
      
      <ul style={stylemenu}>
        
        <li ><h4><Link to="/"> {isAdmin ? "Items":"Dishes"} </Link></h4></li>
        {isAdmin && adminRouter()}
        {
          isLogged ? loggedRouter() : <li><Link to="/login"><h4>Login</h4></Link></li>
        }
       <li onClick={()=>setMenu(!Menu)}> <img src={close} alt="" width="30" className="menu" /></li>
      </ul>
    </header>
  )
}

export default Header