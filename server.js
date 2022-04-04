require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const connect = require("./db");
const userRouter = require("./routes/userrouter");
const uploadRouter = require("./routes/upload");
const foodRouter = require("./routes/foodrouter");
const categoryRouter = require("./routes/categoryrouter");
const path=require("path")

const app = express();

// middleware//
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);


// routes//
app.use("/user", userRouter);
app.use("/api", uploadRouter);
app.use("/api", foodRouter);
app.use("/api", categoryRouter);


// app running in Port//
const PORT = process.env.PORT || 5400;

// mongodb connection//
connect();

if(process.env.NODE_ENV === "production"){
  app.use(express.static("client/build"))
  app.get("*",(request,response)=>{
      response.sendFile(path.join(__dirname,"client","build","index.html"))
  })
}

app.listen(PORT, () => console.log("App Running in Port", PORT));
