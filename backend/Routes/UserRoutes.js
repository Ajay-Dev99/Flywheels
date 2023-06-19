const router = require("express").Router()
const {register,verifyOtp, login,  Listvehicles, viewVehicle, bookACar, filterCar, getHubs, paymentPage, orders, verify, userLogout, getBookingDetails, userHeader, bookingPage, cancelOrder, filterCars} = require("../Controllers/UserControllers")
const userAuth = require("../Middlewares/userAuth")
const { uploadImage } = require("../Middlewares/multer");


router.get("/",userAuth,userHeader)
router.post("/register",register)
router.post("/verifyotp",verifyOtp)
router.post("/login",login)
router.get("/listvehicles",Listvehicles)
router.get("/viewvehicle/:id",viewVehicle)
router.post("/bookacar/:id",userAuth,uploadImage("./public/images/userdocuments"),bookACar)
router.get("/filtercar",filterCar)
router.get("/gethubs",userAuth,getHubs)
router.get("/paymentDetails",userAuth,paymentPage)
router.get("/bookingPage/:id",userAuth,bookingPage)
router.get("/logout",userAuth,userLogout)
router.post("/orders",userAuth,orders)
router.post("/verifypayment",userAuth,verify)
router.get("/bookingdetails",userAuth,getBookingDetails)
router.post("/cancelorder/:id",userAuth,cancelOrder)
router.post("/filtercar",filterCars)


module.exports = router;