const user = require('../Models/userModel')
const jwt = require('jsonwebtoken')
const maxAge = 3 * 24 * 60 * 60;
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceID = process.env.TWILIO_VERIFY_SID;
const client = require('twilio')(accountSid, authToken);
const bcrypt = require('bcrypt');
const vehicleModel = require('../Models/vehicleModel');
let newUser;

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRETE_KEY, {
    expiresIn: maxAge
  })
}

const handleErrors = (err) => {
  let errors = { name: "", email: "", password: "" }

  if (err.message === "Incorrect Email") {
    errors.email = "Email is not registerd"
  }
  if (err.message === "Incorrect password") {
    errors.password = "Incorrect Password"
  }

  if (err.code === 11000) {
    errors.email = "Email is already registered"
    return errors;
  }

  if (err.message.includes("Users validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message
    })
  }
  return errors;

}

module.exports.register = async (req, res, next) => {
  const { name, email, phone_number, password, confirm_password } = req.body
  try {
    const existTrue = await user.findOne({ phone_number: phone_number })
    if (existTrue) {
      res.json({ message: "This Phone Number is already exist", status: false })
    } else {
      const emailExist = await user.findOne({email:email})
      if(emailExist){
      res.json({ message: "This email is already exist", status: false })
      }else{
        newUser = req.body;
        client.verify.v2.services(serviceID)
          .verifications.create({ to: `+91${phone_number}`, channel: "sms" })
        res.json({ status: true })  
      }
      
    }
  } catch (error) {

  }
}

module.exports.verifyOtp = async (req, res, next) => {
  const otpCode = req.body.otp
  client.verify.v2.services(serviceID)
    .verificationChecks.create({ to: `+91${newUser.phone_number}`, code: otpCode })
    .then(async (verification_check) => {
      if (verification_check.status === 'pending') {
        res.json({ status: false, message: "The enterd OTP is invalid" })
      }
      if (verification_check.status === 'approved') {
        const newMember = new user({
          name: newUser.name,
          email: newUser.email,
          phone_number: newUser.phone_number,
          password: newUser.password,
          verified: true
        })
        const userdetails = await newMember.save()
        const token = createToken(userdetails._id)
        res.json({ status: true, message: "Your verification completed successfully",token})

      }
      if (verification_check.status === 429) {
        res.json({ status: false, message: " Max check attempts reached" })
      }
    })
}

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const customer = await user.findOne({ email });
    if (customer) {
      const auth = await bcrypt.compare(password, customer.password);
      if (auth) {
        const token = createToken(customer._id)
   
        res.status(200).json({ user: customer, created: true,token })
      } else {
        throw Error("Incorrect password")
      }
    } else {
      throw Error("Incorrect Email")
    }
  } catch (error) {
    const errors = handleErrors(error)
    res.json({ errors, created: false })
  }
}

module.exports.home = (req,res,next)=>{
  const userdetails = req.user
 res.json({status:true,user:userdetails})
}

module.exports.Listvehicles = async(req,res,next) =>{
  try {
    if(req.query.key){
    const { key  } = req.query;
    const searchData = key
      ? {
          $or: [
            { modelname: { $regex: key, $options: "i" } }, 
            { brand: { $regex: key, $options: "i" } },
          ],
        }
      : {}; 
    const vehicle = await vehicleModel.find(searchData).populate("categoryId");

    res.json({ status: true, vehicle });
    }else {
      const skip = (req.query.page-1)*req.query.limit
      const limit = parseInt(req.query.limit)
      const totalCount = await vehicleModel.countDocuments({});
      const totalPages = Math.ceil(totalCount / limit);
      const vehicle = await vehicleModel.find({}).skip(skip).limit(limit);
      res.json({status:true, vehicle, totalCount, totalPages });
   
    }

   
  } catch (error) {
    res.json({status:false,message:error.message})
    console.log(error);
  }
}

module.exports.viewVehicle = async(req,res,next)=>{
  try {
    const vehicleId = req.params.id
    const vehicle = await vehicleModel.findOne({_id:vehicleId}).populate("categoryId")
    if(vehicle){
      res.json({status:true,vehicle})
    }else{
      res.json({status:false,message:"Something went wrong"})
    }
  } catch (error) {
    res.json({status:false,message:error.message})
  }
}


module.exports.filterCar = async(req,res,next)=>{
try {
  const key = req.query.key
  if(key){
    const skip = (req.query.page-1)*req.query.limit
    const limit = parseInt(req.query.limit)
    const vehicles = await vehicleModel.find({transmissiontype:key}).skip(skip).limit(limit)
    const totalCount = await vehicleModel.find({transmissiontype:key}).countDocuments({});
    const totalPage = Math.ceil(totalCount/limit)
    res.json({status:true, vehicles, totalCount, totalPage})
  }else{
    res.json({status:false})
  }
} catch (error) {
  console.log(error);
  res.status({status:false})
}
}

// module.exports.bookACar = (req,res,next)=>{
//   const date = new Date();

//   const vehicleId = req.params.id
//   const {username,phonenumber,address,district,hometown,pincode,deliverytype,fromDate,toDate,deliveryTIme,hub} = req.body

    
//   if(date<fromDate){
//     console.log("check");
//     res.json({status:false,message:"Invaild From Date"})
//   }
  

//   // console.log(req.body,"user details");
//   // console.log(req.user,"user");
// }



