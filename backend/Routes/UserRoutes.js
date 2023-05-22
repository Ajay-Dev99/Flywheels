const router = require("express").Router()
const {register, sendOtp, verifyOtp} = require("../Controllers/UserControllers")


router.post("/register",register)
router.post("/verifyotp",verifyOtp)

module.exports = router;