require("dotenv").config()
const express = require("express");
const cors = require("cors")
const mongoose = require("mongoose")
const app = express();
const cookieParser = require("cookie-parser")
const userRoutes = require("../backend/Routes/UserRoutes")

app.listen(process.env.PORT,()=>{
    console.log("Server Started on PORT ",process.env.PORT);
});

mongoose.connect("mongodb://0.0.0.0:27017/flywheels",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log("DB connection successfull");
}).catch((err)=>{
    console.log(err.message);
})


app.use(cors({
    origin:process.env.SERVER_URL,
    methods:["GET","POST"],
    credentials:true
}));

app.use(cookieParser())
app.use(express.json());
app.use("/",userRoutes)