const { AdminLogin, adminHome, addcar, listUsers } = require("../Controllers/AdminControllers");
const adminAuth = require("../Middlewares/adminAuth");
const { uploadImage } = require("../Middlewares/multer");


const router = require("express").Router()

router.post("/",adminAuth,adminHome)
router.post("/login",AdminLogin)
router.post("/addcar",adminAuth,uploadImage("./public/images/cars"),addcar)
router.get("/listUsers",adminAuth,listUsers)

module.exports = router;

