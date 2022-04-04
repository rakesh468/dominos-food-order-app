const jwt=require("jsonwebtoken");

const auth=(request,response,next)=>{
 try {
     const token=request.header("Authorization")
     if(!token)
     return response.status(400).json({msg:"Invalid Authentication"})
     jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
         if(err)
         return response.status(400).json({msg:"Invalid Authentication"})
         request.user=user;
         next();
     })
 } catch (error) {
     return response.status(500).json({msg:error.message})
     
 }


} 

module.exports=auth;