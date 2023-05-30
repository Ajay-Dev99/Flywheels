const AdminModel = require('../Models/AdminModel')
const userModel = require('../Models/userModel')
const vehicleModel = require('../Models/vehicleModel')
const categoryModel = require('../Models/CategoryModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const maxAge = 3*24*60*60;
const fs = require('fs')

const createToken = (id)=>{
  return  jwt.sign({id},process.env.JWT_SECRETE_KEY,{
        expiresIn:maxAge
    })
}

module.exports.AdminLogin = async(req,res,next)=>{
try {
    const {email,password} = req.body
    const admin = await AdminModel.findOne({email})
    if(admin){
       const auth = await bcrypt.compare(password,admin.password)
       if(auth){
            const token = await createToken(admin._id)
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

module.exports.adminHome = (req,res,next)=>{
    if(req.admin){
     res.json({status:true})
    }
}

module.exports.addcar =async (req,res,next)=>{
    try {
       console.log(req.files,"request files");
        const exist = await vehicleModel.findOne({vehiclenumber:req.body.vehiclenumber})
        if(exist){
            //delete the image
        //  for (let i = 0; i < req.files.length; i++) {
        //     const imagePath = req.files.image[i];
        //        console.log(imagePath,"image to delete");
        //     fs.unlink(imagePath, (error) => {
        //         if (error) {
        //           console.error('Error deleting image:', error);
        //         } else {
        //           console.log('Image deleted successfully');
        //         }
        //       });
            
        //  }

        req.files.map((image)=>{
            const imagePath = image.path;
            // const modifiedPath = imagePath.replace(/^public[\\/]+/, '');
            fs.unlink(imagePath, (error) => {
                        if (error) {
                          console.error('Error deleting image:', error);
                        } else {
                          console.log('Image deleted successfully');
                        }
                      });
        })
            res.json({status:false ,message:"The vehicle number already exist"})
        }else{
            const images = req.files
            const imageURLs= images.map((image)=>{
                let imagePath = image.path;
                let modifiedImagePath = imagePath.replace(/^public[\\/]+/, '');
                return modifiedImagePath;
            })
            const newVehicle = new vehicleModel({
                vehiclenumber:req.body.vehiclenumber,
                modelname:req.body.modelname,
                brand:req.body.brand,
                fueltype:req.body.fueltype,
                drivenKM:req.body.TotalKm,
                transmissiontype:req.body.transmissionType,
                rentfor30days:req.body.rent30daysormore,
                rentfor10_20days:req.body.rent10to20days,
                rentupto10days:req.body.rentupto10days,
                categoryId:req.body.category,
                image_url:imageURLs,
              
            })
            newVehicle.save().then(()=>{
                res.json({status:true,message:"Vehicle added successfully"})
            })
        }
    } catch (error) {
        res.json({status:false,message:error.message})
    }
}

module.exports.listUsers = async(req,res,next)=>{
    try {
        const users = await userModel.find({})
        if(users){
            res.json({status:true,users})
        }else{
            res.json({status:false,message:"No users Found"})
        }
    } catch (error) {
        res.json({status:false,message:error.message})
    }
}

module.exports.addCategory = async (req,res,next)=>{
    const imagePath = req.files.image[0].path
    const modifiedImagePath = imagePath.replace(/^public[\\/]+/, '');
    try {
        const exist = await categoryModel.findOne({categoryName:req.body.categoryName})
        if(exist){
            fs.unlink(imagePath, (error) => {
                if (error) {
                  console.error('Error deleting image:', error);
                } else {
                  console.log('Image deleted successfully');
                }
              });
            res.json({status:false,message:"Category Name already exist"})
        }else{
            const newCategory = new categoryModel({
                categoryName:req.body.categoryName,
                imageUrl: modifiedImagePath
            })
          const category = await newCategory.save()
                
            res.json({status:true,message:"Category added successfully",category})
        
        }

    } catch (error) {
     res.json({status:false,message:error.message})   
    }
}

module.exports.ListCategories = async (req,res,next) =>{
    try {
        const categories = await categoryModel.find({})
        if(categories){
            res.json({status:true,categories})
        }else{
            res.json({status:false,message:"NOTHING FOUND"})
        }
        } catch (error) {
        res.json({status:false,message:error.message})
    }
} 