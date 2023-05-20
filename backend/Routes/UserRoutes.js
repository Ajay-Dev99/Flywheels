const router = require("express").Router()
const {register} = require("../Controllers/UserControllers")


router.post("/register",register)

module.exports = router;