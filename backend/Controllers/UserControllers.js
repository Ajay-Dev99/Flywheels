const user = require('../Models/userModel')
const jwt = require('jsonwebtoken')
const maxAge = 3 * 24 * 60 * 60;
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceID = process.env.TWILIO_VERIFY_SID;
const client = require('twilio')(accountSid, authToken);
const bcrypt = require('bcrypt')
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
      newUser = req.body;
      client.verify.v2.services(serviceID)
        .verifications.create({ to: `+91${phone_number}`, channel: "sms" })
      res.json({ status: true })

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
        // res.cookie("jwt",token,{
        //   withCredentials:true,
        //   httpOnly:false,
        //   maxAge: maxAge * 1000,
        // });
        res.status(200).json({ user: customer._id, created: true,token })
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
 console.log("jwt validated");
}