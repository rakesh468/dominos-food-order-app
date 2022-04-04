import React, { useContext, useEffect, useState } from 'react'
import "./FoodDetail.css"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import {Link,useParams} from "react-router-dom"
import { Globalstate } from '../../../Globalstate';
import FoodItem from '../utility/FoodItem';

function FoodDetail() {
    const state=useContext(Globalstate)
    const params=useParams()

    const[foods]=state.foodsAPI.foods
    const addCart=state.userAPI.addCart
    const[detailfood,setdetailfood]=useState([])

    useEffect(()=>{
        console.log("render")
        if(params.id){
            foods.forEach(food=>{
                if(food._id=== params.id) setdetailfood(food)
            })
        }

    },[params.id,foods])

    if(detailfood.length === 0)
    return null; 
    
  return (
    <>
    < Card className="detail">
        <img src={detailfood.images.url} alt="poster"/>
        < CardContent className="box-detail">
            <div className="row">
                <h2>{detailfood.title}</h2>
                {/* <h6>#id:{detailfood.food_id}</h6> */}
                </div>
                <span style={{color:"red"}}> ${detailfood.price}</span>
                <p>{detailfood.description}</p>
                <p>{detailfood.content}</p>
                <p>Sold:{detailfood.sold}</p>
                <CardActions >
                <Link to="/cart" className="cart" onClick={()=>addCart(detailfood)}>Buy Now</Link>
                </CardActions>
        </ CardContent>

    </Card>
    <div>
        <h2>Related Foods</h2>
        <div className="foods">
            {
                foods.map(food=>{
                    return food.category===detailfood.category
                    ? <FoodItem key={food._id} food={food}/> : null

                })
            }

        </div>
    </div>
    </>
  )
}

export default FoodDetail