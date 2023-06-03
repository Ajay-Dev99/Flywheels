const router = require("express").Router()
const {register,verifyOtp, login, home, Listvehicles, viewVehicle, search, bookACar} = require("../Controllers/UserControllers")
const userAuth = require("../Middlewares/userAuth")
const { uploadImage } = require("../Middlewares/multer");


router.get("/",userAuth,home)
router.post("/register",register)
router.post("/verifyotp",verifyOtp)
router.post("/login",login)
router.get("/listvehicles",Listvehicles)
router.get("/viewvehicle/:id",viewVehicle)
router.post("/bookacar/:id",userAuth,uploadImage("./public/images/userdocuments"),bookACar)


module.exports = router;