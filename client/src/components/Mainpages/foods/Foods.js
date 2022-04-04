import React, { useContext, useState } from 'react'
import { Globalstate } from '../../../Globalstate'
import "./Foods.css";
import Filter from '../utility/Filter';
import Loadmore from '../utility/Loadmore';
import axios from 'axios';
import FoodItem from '../utility/FoodItem';


function Foods() {
  const state=useContext(Globalstate)

  const[foods,setfoods]=state.foodsAPI.foods
  const[isAdmin]=state.userAPI.isAdmin
  const[token]=state.token
  const[callback,setcallback]=state.foodsAPI.foods
  const[ischecked,setischecked]=useState(false)


  const handlecheck = (id) => {
    foods.forEach(food=>{
      if(food._id===id) food.checked= !food.checked
    })
    setfoods([...foods])
   };

   
   const deletefood = async (id, public_id) => {
    try {
      const destoryimg = await axios.post(
        "/api/destory",
        { public_id },
        {
          headers: { Authorization: token },
        }
      );
      const deletefood = await axios.delete(`/api/foods/${id}`, {
        headers: { Authorization: token },
      });
      await destoryimg;
      await deletefood;
      setcallback(!callback);
    } catch (error) {
      alert(error.response.data.msg);
    }
  };
    
  const checkall=()=>{
    foods.forEach(food=>{
      food.checked = !ischecked
    })
    setfoods([...foods])
    setischecked(!ischecked)
  }

  const deleteall=()=>{
    foods.forEach(food=>{
      if(food.checked) deletefood(food._id,food.images.public_id)
    })
  }

  return (
    <>
    <Filter/>
    {
      isAdmin && 
      <div className="delete-all">
        <span>Select All</span>
        <input type="checkbox"checked={ischecked} onChange={checkall}/>
        <button onClick={deleteall}>Delete All</button>

      </div>
    }
      <div className="foods">
        {foods.map((food) => {
          return (
            <FoodItem
              key={food._id}
              food={food}
              isAdmin={isAdmin}
              deletefood={deletefood}
              handlecheck={handlecheck}
            />
          );
        })}
      </div>
      <Loadmore/>
    </>
  )
}

export default Foods