import React from 'react';
import "./FoodItem.css";
import Btnrender from './Btnrender';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

function FoodItem({ food,isAdmin,deletefood,handlecheck }) {
    
  return (
    <Card className="food_card" >
      {
        isAdmin && <input type="checkbox" checked={food.checked} onChange={()=>handlecheck(food._id)}/>
      }
      <img src={food.images.url} alt=""  />
      <CardContent className="product_box">
        <h2 title={food.title}>{food.title}</h2>
        <span>Rs.{food.price}</span>
        <p>{food.description}</p>
      </CardContent>
    
      <Btnrender food={food} deletefood={deletefood}/>
    </Card>
  )
}

export default FoodItem