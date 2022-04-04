import React, { useContext, useState } from 'react';
import "./Category.css";
import axios from "axios";
import { Globalstate } from '../../../Globalstate';
import Button from "@mui/material/Button";



function Category() {
    const state=useContext(Globalstate);
    const[categories]=state.categoryAPI.category
    const[Category,setCategory]=useState("")
    const[token]=state.token
    const[callback,setcallback]=state.categoryAPI.callback
    const[onedit,setonedit]=useState(false)
    const[id,setid]=useState("")

    const createCategory=async e=>{
        e.preventDefault()
        try {
            if(onedit){
                const result=await axios.put(`/api/category/${id}`,{name:Category},{
                    headers:{Authorization:token}
                })
               
                alert(result.data.msg)
                
            }else{
                const result=await axios.post("/api/category",{name:Category},{
                    headers:{Authorization:token}
                })
               
                alert(result.data.msg)

            }
            setonedit(false)
            setCategory("")
            setcallback(!callback)
           
        } catch (error) {
            alert(error.response.data.msg)
        }
    }

    const editcategory=async(id,name)=>{
        setid(id)
        setCategory(name)
        setonedit(true)

    }

    const deletecategory=async id=>{
        try {
            const result=await axios.delete(`/api/category/${id}`,{
                headers:{Authorization:token}
            })
            alert(result.data.msg)
            setcallback(!callback)
            
        } catch (error) {
            alert(error.response.data.msg)
            
        }
    }



  return (
    <div className="categories">
    <form onSubmit={createCategory}>
        <label htmlFor="category">Category</label>
        <input type="text" name="category" value={Category} required onChange={event=>setCategory(event.target.value)} />
        <Button variant="contained" size="medium" type="submit">{onedit ?"Update": "Create"}</Button>
    </form>
    <div className="col">
        {
            categories.map(Category=>(
                <div className="row" key={Category._id}>
                    <p>{Category.name}</p>
                    <div>
                        <Button variant="contained" onClick={()=>editcategory(Category._id,Category.name)}>Edit</Button>
                        <Button color="error" variant="contained" onClick={()=>deletecategory(Category._id)}>Delete</Button>
                    </div>
                    
                </div>
            ))
        }
        </div>

</div>
  )
}

export default Category