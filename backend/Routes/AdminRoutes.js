const { AdminLogin, adminHome, addcar, listUsers, addCategory, ListCategories } = require("../Controllers/AdminControllers");
const adminAuth = require("../Middlewares/adminAuth");
const upload = require("../Middlewares/imageupload");
const { uploadImage } = require("../Middlewares/multer");



const router = require("express").Router()

router.post("/",adminAuth,adminHome)
router.post("/login",AdminLogin)
// router.post("/addcar",adminAuth,uploadImage("./public/images/cars"),addcar)
router.post("/addcar",adminAuth,upload.array('vehicle'),addcar)
router.get("/listUsers",adminAuth,listUsers)
router.post("/addCategory",adminAuth,uploadImage("./public/images/categoryimages"),addCategory)
router.get("/getCategories",adminAuth,ListCategories)

module.exports = router;

