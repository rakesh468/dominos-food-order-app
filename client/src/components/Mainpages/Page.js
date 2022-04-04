import React,{useContext} from 'react';
import Register from './auth/Register';
import Login from './auth/Login';
import { Globalstate } from '../../Globalstate';
import {Switch,Route} from "react-router-dom";
import Notfound from './utility/Notfound';
import Cart from './cart/Cart';
import Category from './categories/Category';
import Createfood from './createfood/Createfood';
import Foods from './foods/Foods';
import FoodDetail from './fooddetails/FoodDetail';


function Page() {
  const state=useContext(Globalstate)

  const isLogged=state.userAPI.isLogged
  const isAdmin=state.userAPI.isAdmin

  return (
    <Switch>
      <Route path="/" exact component={Foods}></Route>
      <Route path="/detail/:id" exact component={FoodDetail}></Route>
     <Route path="/login" exact component={isLogged? Login :Notfound}></Route>
      <Route path="/register" exact component={isLogged ? Register : Notfound}></Route>
      <Route path="/cart" exact component={Cart}></Route>
      <Route path="/create_food" exact component={isAdmin ? Createfood : Notfound}></Route>
      <Route path="/edit_food/:id" exact component={isAdmin ? Createfood : Notfound}></Route>
      <Route path="/category" exact component={isAdmin ? Category : Notfound}></Route>
      <Route path="*"exact component={Notfound}></Route>
      
    </Switch>
  )
}

export default Page