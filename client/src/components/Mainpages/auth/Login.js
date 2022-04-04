import React,{useState} from 'react'
import "./Login.css";
import axios from "axios";
import {Link} from "react-router-dom";
import Button from '@mui/material/Button';


function Login() {

    const[user,setuser]=useState({
        email:"",
        password:""
    })

    const onChangeInput= async e=>{
        const {name,value}=e.target;
        setuser({...user,[name]:value})
      }

      const loginSubmit=async e=>{
        e.preventDefault()
        try {
          await axios.post("/user/login",{...user})
         localStorage.setItem("firstlogin",true)
          window.location.href="/";
          
        } catch (error) {
          alert(error.response.data.msg)
        }
      }
  return (
    <div className="login-page">
      <form onSubmit={loginSubmit}>
        <h2>Login</h2>
        <input type="email" name="email" required placeholder="Enter Email Id" value={user.email} onChange={onChangeInput}/>
        <input type="password" name="password" required  placeholder="Enter password " value={user.password} onChange={onChangeInput}/>
        <div className="row">
          <Button variant="contained" size="medium" type="submit">Login</Button>
         <Button variant="contained" color="secondary" size="medium"> <Link to="/register">Register</Link></Button>
          </div>
        
      </form>

    </div>
  )
}

export default Login