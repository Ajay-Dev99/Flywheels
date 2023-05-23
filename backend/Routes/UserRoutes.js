const router = require("express").Router()
const {register, sendOtp, verifyOtp, login, home} = require("../Controllers/UserControllers")
const userAuth = require("../Middlewares/userAuth")

router.get("/",userAuth,home)
router.post("/register",register)
router.post("/verifyotp",verifyOtp)
router.post("/login",login)

module.exports = router;