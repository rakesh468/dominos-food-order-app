import  { useEffect, useState } from 'react'
import axios from "axios"

function UserAPI(token) {
    
    const[isLogged,setIsLogged]=useState(false)
    const[isAdmin,setIsAdmin]=useState(false)
    const[cart,setcart]=useState([])

    useEffect(()=>{
        if (token) {
            const getUser = async () => {
              try {
                const result = await axios.get("/user/infor", {
                  headers: {Authorization : token }
                })
                setIsLogged(true)
                result.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false)
                 setcart(result.data.cart)
                
              } catch (error) {
                alert(error.response.data.msg);
              }
            }
            getUser()
          }
        
    },[token])



    // Adding to cart//
    const addCart=async(food)=>{
        if(!isLogged) return alert("Please Login to continue buying")
    
        const check=cart.every(item=>{
          return item._id !== food._id
        })
         
        if(check){
          setcart([...cart,{...food,quantity:1}])
    
          await axios.patch("/user/addcart",{cart:[...cart,{...food,quantity:1}]},{
            headers:{Authorization:token}
          })
        }else{
          alert("This is Item is already Added to cart")
        }
      }

  return{
    isLogged:[isLogged,setIsLogged],
    isAdmin:[isAdmin,setIsAdmin],
    cart:[cart,setcart],
    addCart:addCart,

  }
}

export default UserAPI;