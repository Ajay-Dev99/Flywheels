const router = require("express").Router()
const {register,verifyOtp, login, home, Listvehicles, viewVehicle, bookACar, filterCar, getHubs, paymentPage, orders, verify, userLogout} = require("../Controllers/UserControllers")
const userAuth = require("../Middlewares/userAuth")
const { uploadImage } = require("../Middlewares/multer");


router.get("/",userAuth,home)
router.post("/register",register)
router.post("/verifyotp",verifyOtp)
router.post("/login",login)
router.get("/listvehicles",Listvehicles)
router.get("/viewvehicle/:id",viewVehicle)
router.post("/bookacar/:id",userAuth,uploadImage("./public/images/userdocuments"),bookACar)
router.get("/filtercar",filterCar)
router.get("/gethubs",getHubs)
router.get("/paymentDetails",userAuth,paymentPage)
router.get("/logout",userAuth,userLogout)
router.post("/orders",userAuth,orders)
router.post("/verifypayment",userAuth,verify)


module.exports = router;