const user = require('../Models/userModel')
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceID = process.env.TWILIO_VERIFY_SID;
const client = require('twilio')(accountSid, authToken);
let newUser;

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
    .then((verification_check) => {
      if (verification_check.status === 'pending') {
        res.json({ status:false,message: "The enterd OTP is invalid" })
      }
      if (verification_check.status === 'approved') {
        const newMember = new user({
          name:newUser.name,
          email:newUser.email,
          phone_number:newUser.phone_number,
          password:newUser.password
        })
        newMember.save()
        res.json({ status:true,message: "Your verification completed successfully" })

      }
      if(verification_check.status === 429){
        res.json({status:false,message:" Max check attempts reached"})
      }
    })
}