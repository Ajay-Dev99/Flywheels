const jwt = require('jsonwebtoken')

const userModel = require('../Models/userModel')

module.exports = async(req,res,next)=>{
    try {
        const authHeader =req.headers.authorization
        console.log(authHeader,"0000000");
        const authToken = authHeader && authHeader.split(" ")[1];
        console.log(authToken,"pppppp");
        // if there is no tocken
        if(!authToken) return res.json({ loginfail: true, status: false, message: "no auth token" });

        //decording the token
        const decoded = jwt.verify(authToken,process.env.JWT_SECRETE_KEY)
        //checking whether the user is exist or not
        const user = await userModel.findOne({_id:decoded.id})
        if(!user) return res.json({loginfail:true,status:false,message:"Unauthorized"})
        req.user = user
        console.log(req.user,"user");

        next()
    } catch (error) { 
        return res.json({loginfail:true,status:false,message:"Unauthorized"})
    }
}