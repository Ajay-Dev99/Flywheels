const { AdminLogin } = require("../Controllers/AdminControllers");

const router = require("express").Router()

router.post("/login",AdminLogin)

module.exports = router;