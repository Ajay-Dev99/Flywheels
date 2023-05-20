 const user = require('../Models/userModel')
module.exports.register = async(req,res,next)=>{
   const {name,email,phone_number,password,confirm_password} = req.body
   try {
    const existTrue = user.findOne({phone_number})
    if(existTrue){
     res.json({message:"This Phone Number is already exist",status:false})
    }else{
       const newUser = user.create({
          name,email,phone_number,password
       })
    }
   } catch (error) {
    
   }
}