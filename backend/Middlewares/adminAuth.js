const jwt = require('jsonwebtoken')
 const AdminModel = require('../Models/AdminModel');

 module.exports = async (req,res,next)=>{
    try {
        const authHeader = req.headers.authorization
        const authtoken = authHeader.replace(/^Bearer\s+/i, '');
        //if there is no token
        if(!authtoken) return res.json({loginfail:true,status:false,message:"NO auth token"})

        //decodin the token
        const decoded = jwt.verify(authtoken,process.env.JWT_SECRETE_KEY)
        //checking whether user exist or not
        const admin = await AdminModel.findOne({_id:decoded.id})
        if(!admin) return res.json({loginfail:true,status:false,message:"Unauthorized token"})
        req.admin = admin
        next()
        
    } catch (error) {
      return  res.json({loginfail:true,status:false,message:"Unauthorized"})
    }
 }