const mongoose = require("mongoose")
const user = require('../Models/userModel')
const jwt = require('jsonwebtoken')
const maxAge = 3 * 24 * 60 * 60;
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceID = process.env.TWILIO_VERIFY_SID;
const client = require('twilio')(accountSid, authToken);
const bcrypt = require('bcrypt');
const vehicleModel = require('../Models/vehicleModel');
const hubModel = require('../Models/HubModel')
const bookingModel = require('../Models/BookingModel')
const razorPay = require('razorpay')
const crypto = require('crypto');
const userModel = require("../Models/userModel");
const orderModel = require('../Models/BookingModel')

let newUser;
let userDocument;

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRETE_KEY, {
    expiresIn: maxAge
  })
}

const handleErrors = (err) => {
  let errors = { name: "", email: "", password: "", block: "" }

  if (err.message === "Incorrect Email") {
    errors.email = "Email is not registerd"
  }
  if (err.message === "Incorrect password") {
    errors.password = "Incorrect Password"
  }

  if (err.message === "Currently, your account is suspended") {
    errors.block = "Currently, your account is suspended"
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
      const emailExist = await user.findOne({ email: email })
      if (emailExist) {
        res.json({ message: "This email is already exist", status: false })
      } else {
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
        res.json({ status: true, message: "Your verification completed successfully", token })

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
        if (customer.blockStatus) {
          throw Error("Currently, your account is suspended")

        } else {
          const token = createToken(customer._id)
          res.status(200).json({ user: customer, created: true, token })
        }
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

module.exports.userHeader = (req, res, next) => {
  const userdetails = req.user
  res.json({ status: true, user: userdetails })
}

module.exports.Listvehicles = async (req, res, next) => {
  try {
    if (req.query.key) {
      const { key } = req.query;
      const searchData = key
        ? {
          $or: [
            { modelname: { $regex: key, $options: "i" } },
            { brand: { $regex: key, $options: "i" } },
          ],
        }
        : {};
      const vehicle = await vehicleModel.find(searchData).populate("categoryId")
      console.log(vehicle, "jsdhfjhds");
      if (vehicle.length === 0) {
        res.json({ status: false });
      } else {
        res.json({ status: true, vehicle });
      }
    } else {
      const skip = (req.query.page - 1) * req.query.limit
      const limit = parseInt(req.query.limit)
      const totalCount = await vehicleModel.countDocuments({});
      const totalPages = Math.ceil(totalCount / limit);
      const vehicle = await vehicleModel.find({}).skip(skip).limit(limit);
      res.json({ status: true, vehicle, totalCount, totalPages });

    }


  } catch (error) {
    res.json({ status: false, message: error.message })
    console.log(error);
  }
}

module.exports.viewVehicle = async (req, res, next) => {
  try {
    const vehicleId = req.params.id
    const vehicle = await vehicleModel.findOne({ _id: vehicleId }).populate("categoryId").populate("hub");
    if (vehicle) {
      res.json({ status: true, vehicle })
    } else {
      res.json({ status: false, message: "Something went wrong" })
    }
  } catch (error) {
    res.json({ status: false, message: error.message })
    console.log(error);
  }
}


module.exports.filterCar = async (req, res, next) => {
  try {
    const key = req.query.key
    if (key) {
      const skip = (req.query.page - 1) * req.query.limit
      const limit = parseInt(req.query.limit)
      const vehicles = await vehicleModel.find({ transmissiontype: key }).skip(skip).limit(limit)
      const totalCount = await vehicleModel.find({ transmissiontype: key }).countDocuments({});
      const totalPage = Math.ceil(totalCount / limit)
      res.json({ status: true, vehicles, totalCount, totalPage })
    } else {
      res.json({ status: false })
    }
  } catch (error) {
    console.log(error);
    res.status({ status: false })
  }
}


module.exports.getHubs = async (req, res, next) => {
  try {
    const hubs = await hubModel.find({})
    if (hubs) {
      res.json({ status: true, hubs })
    } else {
      res.json({ status: false, message: "No Hubs found" })
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports.bookingPage = async (req, res, next) => {
  try {
    const vehicleId = req.params.id
    const vehicle = await vehicleModel.findById(vehicleId).populate("hub")

    if (vehicle) {
      res.json({ status: true, vehicle })
    } else {
      res.json({ status: false, message: "Something Went Wrong" })
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports.bookACar = async (req, res, next) => {
  try {
    const fromDate = new Date(req.body.fromDate)
    const toDate = new Date(req.body.toDate)
    const currentDate = new Date()
    const timeDiff = Math.abs(fromDate.getTime() - currentDate.getTime());
    const dayFromCurrent = Math.ceil(timeDiff / (1000 * 3600 * 24));
    const vehicleId = req.params.id
    const vehicle = await vehicleModel.findOne({ _id: vehicleId }).populate('hub')
    const district = vehicle.hub.district

    if (req.body.deliverytype === 'delivery') {
      if (district !== req.body.district) {
        return res.json({ status: false, message: `Door delivery service only available in ${district}` })
      }
    }
    if (req.body.deliverytype === "pickup") {
      const hubId = req.body.hub
      const hub = await hubModel.findOne({ _id: hubId })
      if (district !== hub.district) {
        return res.json({ status: false, message: `This vehicle only available in ${district} hub` })
      } else {
        req.session.hub = hub
      }
    }
    if (fromDate <= currentDate) {
      return res.json({ status: false, message: "Please select a future date for the start of the booking" });
    } else if (dayFromCurrent > 3) {
      return res.json({ status: false, message: "You can only book the car before 3 days" })
    } else if (toDate <= currentDate || toDate < fromDate) {
      return res.json({ status: false, message: "Please select a future date for the end of the booking" });
    } else if (fromDate.getTime() === toDate.getTime()) {
      return res.json({ status: false, message: "The booking should be for at least one day" });

    }
    else {
      req.session.bookingDetails = req.body;
      req.session.userDocument = req.files.image[0].path;
      req.session.vehicleId = req.params.id;
      return res.json({ status: true });
    }

  } catch (error) {
    console.log(error);
  }
}

module.exports.paymentPage = async (req, res, next) => {
  userDocument = req.session.userDocument;
  let hubDetails = false
  try {
    const bookingDeatails = await req.session.bookingDetails;
    if (bookingDeatails.deliverytype === 'pickup') {
      const hubId = bookingDeatails.hub
      hubDetails = await hubModel.findOne({ _id: hubId })
    }
    const fromDate = new Date(bookingDeatails.fromDate);
    const toDate = new Date(bookingDeatails.toDate);
    const timeDiff = Math.abs(toDate.getTime() - fromDate.getTime());
    const numberOfDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    const vehicleId = req.session.vehicleId;
    const vehicle = await vehicleModel.findOne({ _id: vehicleId });
    let totalAmount;
    if (vehicle) {
      if (numberOfDays > 0 && numberOfDays <= 10) {
        totalAmount = numberOfDays * vehicle.rentupto10days
      } else if (numberOfDays > 10 && numberOfDays <= 20) {
        totalAmount = numberOfDays * vehicle.rentfor10_20days
      } else if (numberOfDays > 20 && numberOfDays <= 60) {
        totalAmount = numberOfDays * vehicle.rentfor30days
      }
      res.json({ status: true, bookingDeatails, vehicle, totalAmount, numberOfDays, hubDetails });
    } else {
      res.json({ status: false })
    }
  } catch (error) {
    console.log(error);
  }
}


module.exports.orders = async (req, res, next) => {

  try {
    const instance = new razorPay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRETE_KEY_ID,
    });

    const options = {
      amount: req.body.amount * 100,
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };

    instance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res.json({ status: false, message: "Something went wrong" });
      }
      // Handle successful order creation
      return res.json({ status: true, order });
    });
  } catch (error) {
    console.log(error);
    res.json({ status: false, message: "Server Error" });
  }
};

module.exports.verify = async (req, res, next) => {
  const amount = (req.body.amount) / 100
  const vehicleId = req.body.vehicleid


  const date = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body
    const sign = razorpay_order_id + "|" + razorpay_payment_id
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRETE_KEY_ID)
      .update(sign.toString())
      .digest("hex")

    if (razorpay_signature === expectedSign) {
      let hub;
      if (req.body.deliverytype === 'pickup') {
        hub = req.body.hub
      } else {
        hub = null
      }
      let userDocumentImagePath = await userDocument.replace(/^public[\\/]+/, '');
      const newOrder = new bookingModel({
        user_id: req.user._id,
        vehicle_id: req.body.vehicleid,
        booked_At: date,
        deliveryType: req.body.deliverytype,
        deliveryDetails: [{
          address: req.body.address,
          district: req.body.district,
          homeTown: req.body.hometown,
          pincode: req.body.pincode
        }],
        fromDate: req.body.fromDate,
        toDate: req.body.toDate,
        deliveryTime: req.body.deliveryTime,
        Hub: hub,
        payment_id: req.body.razorpay_payment_id,
        amount: req.body.amount,
        userDocumentImageURL: userDocumentImagePath
      })

      const order = await newOrder.save()
      const orderId = order._id
      await vehicleModel.findOneAndUpdate({ _id: vehicleId }, { $set: { bookedStatus: true } })
      req.session.bookingDeatails = null;
      req.session.vehicleId = null;
      userDocument = null;
      res.json({ status: true, message: "Payment successfull", orderId })
    } else {
      res.json({ status: false, message: "Invalid signature sent!" })
    }

  } catch (error) {
    console.log(error);
    res.json({ status: false, message: "Internal Server Error!" });
  }
}

module.exports.getBookingDetails = async (req, res, next) => {
  try {

    const id = req.user._id;
    const bookings = await bookingModel.find({ user_id: id }).populate("vehicle_id").populate("Hub").sort({ _id: -1 });

    if (bookings) {
      if (bookings.length > 0) {
        res.json({ status: true, bookings })
      } else {
        res.json({ status: false })
      }
    } else {
      res.json({ status: false, message: "Something Went Wrong" })
    }
  } catch (error) {
    console.log(error);
    res.json({ status: false, message: "Internal Server Error" })
  }
}


module.exports.cancelOrder = async (req, res, next) => {
  try {
    const bookingId = req.params.id
    const cancelledBooking = await bookingModel.findOneAndUpdate({ _id: bookingId }, { $set: { cancelStatus: true } }).populate("vehicle_id")
    const vehicle_id = cancelledBooking.vehicle_id._id
    await vehicleModel.findOneAndUpdate({ _id: vehicle_id }, { $set: { bookedStatus: false } })
    res.json({ status: true, message: "Booking Cancelled!!", cancelledBooking })
  } catch (error) {
    console.log(error);
  }
}

module.exports.userLogout = async (req, res, next) => {
  try {
    req.session.bookingDeatails = null;
    req.session.vehicleId = null;
    userDocument = null;
  } catch (error) {
    console.log(error);
  }
}

module.exports.filterCars = async (req, res, next) => {

  try {

    let vehicles;
    if (req.body.key === 'category') {
      const categoryID = new mongoose.Types.ObjectId(req.body.value)
      vehicles = await vehicleModel.find({ categoryId: categoryID })
    } else if (req.body.key === "Transmission") {
      const type = req.body.value
      vehicles = await vehicleModel.find({ transmissiontype: type })
    } else if (req.body.key === 'fuel') {
      const type = req.body.value
      vehicles = await vehicleModel.find({ fueltype: type })
    } else if (req.body.key === 'hub') {
      const value = new mongoose.Types.ObjectId(req.body.value)
      vehicles = await vehicleModel.find({ hub: value })
    }
    res.json({ vehicles })
  } catch (error) {
    console.log(error);
  }
}

module.exports.getDetails = async (req, res, next) => {
  try {
    const user = req.user
    res.json({ status: true, user })
  } catch (error) {

  }
}

module.exports.updateUserDetails = async (req, res, next) => {
  try {
    const user = req.user
    const { username, email } = req.body
    const userfound = await userModel.findOne({ _id: user._id })
    const newUser = await userModel.findOneAndUpdate({ _id: user._id }, {
      $set: {
        name: username,
        email: email
      }
    }, { new: true })
    res.json({ status: true, message: "Updated", newUser })
  } catch (error) {
    console.log(error);
  }
}

module.exports.changePassword = async (req, res, next) => {

  try {
    const user = req.user
    const { currentPassword, newPassword, confirmPassword } = req.body
    const passwordMatch = await bcrypt.compare(currentPassword, user.password);
    const customer = await userModel.findOne({ _id: user._id })
    if (passwordMatch) {
      if (newPassword === confirmPassword) {
        customer.password = newPassword
        const updatedUser = customer.save()
        const token = await createToken(updatedUser._id)
        res.json({ status: true, message: "Password changed successfully", token })
      } else {
        res.json({ status: false, message: "New password and confirm password do not match" })
      }
    } else {
      res.json({ status: false, message: "Current password is incorrect" })
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports.getOrderDetails = async (req, res, next) => {
  
  try {
    const orderId = req.params.id
    const order = await orderModel.findOne({ _id: orderId }).populate("user_id").populate("vehicle_id").populate("Hub")
    if (order) {
      res.json({ status: true, order })
    } else {
      res.json({ status: false, message: "Something went wrong" })
    }
  } catch (error) {
    console.log(error);
    res.json({ status: false, message: "Internal server Error" })
  }
}