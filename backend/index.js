require("dotenv").config()
const express = require("express");
const cors = require("cors")
const mongoose = require("mongoose")
const app = express();
const cookieParser = require("cookie-parser")
const userRoutes = require("../backend/Routes/UserRoutes")
const AdminRoutes = require("../backend/Routes/AdminRoutes")
const path = require('path');
const session = require('express-session');


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


app.use(session({
    secret: process.env.SESSION_SECRET_KEY, // Add a secret key for session encryption
    resave: false,
    saveUninitialized: true
  }));
  

app.use(cors({
    origin:process.env.SERVER_URL,
    methods:["GET","POST"],
    credentials:true
}));




// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/",userRoutes);
app.use("/admin",AdminRoutes);
app.use(express.static(path.join(__dirname, 'public')));


// app.use((err, req, res, next) => {
//     if (err instanceof multer.MulterError) {
//       // A Multer error occurred when uploading
//       if (err.code === 'LIMIT_FILE_TYPE') {
//         console.log(err.message);
//         res.status(400).json({ message: err.message });
//       } else {
//         console.log(err.message);
//         res.status(500).json({ message: err.message });
//       }
//     } else {
//       // An unknown error occurred
//       res.status(500).json({ message: 'Unknown error occurred' });
//       console.log("err.message");

//     }
//   });
  