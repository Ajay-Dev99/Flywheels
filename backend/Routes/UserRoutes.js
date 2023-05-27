const router = require("express").Router()
const {register,verifyOtp, login, home, Listvehicles} = require("../Controllers/UserControllers")
const userAuth = require("../Middlewares/userAuth")

router.get("/",userAuth,home)
router.post("/register",register)
router.post("/verifyotp",verifyOtp)
router.post("/login",login)
router.get("/listvehicles",Listvehicles)


module.exports = router;