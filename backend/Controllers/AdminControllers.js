const AdminModel = require('../Models/AdminModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const maxAge = 3*24*60*60;

const createToken = (id)=>{
    jwt.sign({id},"secret-key",{
        expiresIn:maxAge
    })
}

module.exports.AdminLogin = async(req,res,next)=>{
try {
    console.log("admin side called",req.body);
    const {email,password} = req.body
    const admin = await AdminModel.findOne({email})
    if(admin){
       const auth = await bcrypt.compare(password,admin.password)
       if(auth){
           console.log("admin login succesfull");
            const token = createToken(admin._id)
           res.json({status:true,message:"Admin login successfull",token})
       }else{
           res.json({status:false,message:"Incorrect Password"})
       }
    }else{
       res.json({status:false,message:"Admin not Found.Please check your email"})
    }
    
} catch (error) {
    res.json({status:false,message:error.message})
}
 
}