import {useState,useEffect} from "react";
import axios from "axios"


function CategoryAPI() {
    const[category,setcategory]=useState([])
    const[callback,setcallback]=useState(false)

    useEffect(()=>{
        const getcategory=async()=>{
            const result=await axios.get("/api/category")
            setcategory(result.data)
        }
        getcategory()
    },[callback])

  return {
      category:[category,setcategory],
      callback:[callback,setcallback]
  }
}

export default CategoryAPI;