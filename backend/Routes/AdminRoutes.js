const { AdminLogin, adminHome, addcar, listUsers, addCategory, ListCategories, viewVehicleDetails, editCar, deleteVehicle, addHub } = require("../Controllers/AdminControllers");
const adminAuth = require("../Middlewares/adminAuth");
const upload = require("../Middlewares/imageupload");
const { uploadImage } = require("../Middlewares/multer");



const router = require("express").Router()

router.post("/",adminAuth,adminHome)
router.post("/login",AdminLogin)
// router.post("/addcar",adminAuth,uploadImage("./public/images/cars"),addcar)
router.post("/addcar",adminAuth,upload.array('vehicle'),addcar)
router.post("/editcar/:id",upload.array('image'),editCar)
router.get("/listUsers",adminAuth,listUsers)
router.post("/addCategory",adminAuth,uploadImage("./public/images/categoryimages"),addCategory)
router.get("/getCategories",adminAuth,ListCategories)
router.get("/viewvehicledetails/:id",adminAuth,viewVehicleDetails)
router.post("/deletecar/:id",adminAuth,deleteVehicle)
router.post("/addhub",adminAuth,uploadImage("./public/images/HubImages"),addHub)

module.exports = router;

