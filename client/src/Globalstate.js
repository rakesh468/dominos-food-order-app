import {createContext,useEffect,useState} from 'react';
import axios from "axios";
import FoodsAPI from './components/api/FoodsAPI';
import CategoryAPI from './components/api/CategoryAPI';
import UserAPI from './components/api/UserAPI';



export const Globalstate=createContext();

export const DataProvider=({children})=>{
    const[token,settoken]=useState(false)

    useEffect(()=>{
        const firstlogin=localStorage.getItem('firstlogin')
        if(firstlogin){
           
            const refreshToken=async()=>{
                const result=await axios.get("/user/refresh_token")
               settoken(result.data.accesstoken)
               setTimeout(()=>{
                   refreshToken()
               },10*60*1000)
            }
            refreshToken();
        }

    },[])

    const state={
        token:[token,settoken],
        foodsAPI:FoodsAPI(),
        categoryAPI:CategoryAPI(),
        userAPI:UserAPI(token)
    }
    return(
   
        <Globalstate.Provider value={state}>
                 {children}
             </Globalstate.Provider>
         )
}

