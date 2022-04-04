import React, { useContext, useEffect, useState } from 'react'
import { Globalstate } from '../../../Globalstate';
import {useParams,useHistory} from "react-router-dom"
import "./Createfood.css";
import axios from 'axios';

const initialState = {
    food_id: "",
    title: "",
    price: 0,
    description: "",
    category: "",
    _id: "",
  };

function Createfood() {
    const state=useContext(Globalstate)
    const[food,setfood]=useState(initialState)
    const[category]=state.categoryAPI.category
    const[images,setimages]=useState(false)
    const[isAdmin]=state.userAPI.isAdmin
    const[token]=state.token
    const param=useParams()
    const history=useHistory()
    const[foods]=state.foodsAPI.foods
    const[onedit,setonedit]=useState(false)
    const[callback,setcallback]=state.foodsAPI.callback


    useEffect(()=>{
        if (param.id) {
            setonedit(true);
            foods.forEach((food) => {
              if (food._id === param.id) {
                setfood(food);
                setimages(food.images);
              }
            })
          } else {
            setonedit(false);
            setfood(initialState);
           
            setimages(false);
          }

    },[param.id,foods])

    const handleUpload = async (event) => {
        event.preventDefault();
        try {
          if (!isAdmin) return alert("You are not an Admin");
    
          const file = event.target.files[0];
    
          if (!file) return alert("file not Exist");
    
          if (file.size > 1024 * 1024) return alert("Size is not large");
    
          if (file.type !== "image/jpeg" && file.type !== "image/png")
            return alert("File Format is incorrect");
    
          let formData = new FormData();
          formData.append("file", file);
    
          const result = await axios.post("/api/upload", formData, {
            headers: {
              "content-type": "multipart/form-data",
              Authorization: token,
            },
          });
    
          setimages(result.data);
        } catch (error) {
          alert(error.response.data.msg);
        }
      };
      
      const handledestory = async () => {
        try {
          if (!isAdmin) return alert("You are not an Admin");
          await axios.post(
            "/api/destory",
            { public_id: images.public_id },
            {
              headers: { Authorization: token },
            }
          );
    
          setimages(false);
        } catch (error) {
          alert(error.response.data.msg);
        }
      };

      const handlechangeInput = (event) => {
        const { name, value } = event.target;
        setfood({ ...food, [name]: value });
      };
      const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          if (!isAdmin) return alert("You are not an Admin");
          if (!images) return alert("Image is not uploaded");
          if(onedit){
            await axios.put(`/api/foods/${food._id}`, { ...food, images },
                {
                  headers: { Authorization: token },
                }
              );
    
          }else{
            await axios.post(
                "/api/foods",
                { ...food, images },
                {
                  headers: { Authorization: token },
                }
              );
    
          }
         
          setcallback(!callback)
          
          
          history.push("/");
        } catch (error) {
          alert(error.response.data.msg);
        }
      };

      const styleupload = {
        display: images ? "block" : "none",
      };

      return (
        <div className="create_food">
        <div className="upload">
          <input type="file" name="file" id="file_up" onChange={handleUpload} />
          <div id="file_img" style={styleupload}>
            <img src={images ? images.url : ""} alt="" />
            <span onClick={handledestory}>X</span>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <label htmlFor="food_id">Food ID:</label>
            <input
              type="text"
              name="food_id"
              id="food_id"
              value={food.food_id}
              onChange={handlechangeInput}
              disabled={onedit}
              required
            />
          </div>
          <div className="row">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              name="title"
              id="title"
              value={food.title}
              onChange={handlechangeInput}
              required
            />
          </div>
          <div className="row">
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              name="price"
              id="price"
              value={food.price}
              onChange={handlechangeInput}
              required
            />
          </div>
          <div className="row">
            <label htmlFor="description">Description:</label>
            <textarea
              type="text"
              name="description"
              id="description"
              value={food.description}
              row="5"
              onChange={handlechangeInput}
              required
            />
          </div>
         
          <div className="row">
            <label htmlFor="categories">Categories:</label>
            <select
              name="category"
              value={food.category}
              onChange={handlechangeInput}
            >
              <option value="">Select a Category</option>
              {category.map((category) => (
                <option value={category._id} key={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit">{onedit ? "Update" : "Create"}</button>
        </form>
      </div>
  )
}

export default Createfood