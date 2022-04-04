const mongoose=require("mongoose")
const asynchandler=require("./middleware/asynchandler")

module.exports=asynchandler(async()=>{
    const connectionparams={
        useNewUrlParser:true,
        useUnifiedTopology:true
    }
    const connection= await mongoose.connect(process.env.MONGO_DB_URL,connectionparams)
    connection ?
    console.log("MongoDb Connected")
    :
    console.log("Database not Connected")
})