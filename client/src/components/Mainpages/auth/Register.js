import React,{useState} from 'react'
import axios from  "axios"
import Button from '@mui/material/Button';

function Register() {

    const[user,setuser]=useState({
        name:"",
        email:"",
        password:""
    })

    const onChangeInput= async e=>{
        const {name,value}=e.target;
        setuser({...user,[name]:value})
      }

      const registerSubmit=async e=>{
        e.preventDefault()
        try {
          await axios.post("/user/register",{...user})
          localStorage.setItem("firstlogin",true)
          window.location.href="/";
          
        } catch (error) {
          alert(error.response.data.msg)
        }
      }

  return (
    <div className="login-page">
    <form onSubmit={ registerSubmit}>
      <h2>Register</h2>
    <input type="text" name="name" required placeholder="Enter name " value={user.name} onChange={onChangeInput}/>
      <input type="email" name="email" required placeholder="Enter Email Id" value={user.email} onChange={onChangeInput}/>
      <input type="password" name="password" required  placeholder="Enter password " value={user.password} onChange={onChangeInput}/>
      <div className="row">
        <Button   size="medium" variant="contained" color="secondary" type="submit">Register</Button>
        
        </div>
      
    </form>

  </div>
  )
}

export default Register;