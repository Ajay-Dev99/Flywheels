const AdminModel = require('../Models/AdminModel')
const userModel = require('../Models/userModel')
const vehicleModel = require('../Models/vehicleModel')
const categoryModel = require('../Models/CategoryModel')
const orderModel = require('../Models/BookingModel')
const hubModel = require('../Models/HubModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const maxAge = 3 * 24 * 60 * 60;
const fs = require('fs')
const BookingModel = require('../Models/BookingModel')

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRETE_KEY, {
        expiresIn: maxAge
    })
}

module.exports.AdminLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const admin = await AdminModel.findOne({ email })
        if (admin) {
            const auth = await bcrypt.compare(password, admin.password)
            if (auth) {
                const token = await createToken(admin._id)
                res.json({ status: true, message: "Admin login successfull", token })
            } else {
                res.json({ status: false, message: "Incorrect Password" })
            }
        } else {
            res.json({ status: false, message: "Admin not Found.Please check your email" })
        }

    } catch (error) {
        res.json({ status: false, message: error.message })
    }

}

module.exports.adminHome = (req, res, next) => {
    if (req.admin) {
        res.json({ status: true })
    }
}

module.exports.addcar = async (req, res, next) => {
    try {
        const exist = await vehicleModel.findOne({ vehiclenumber: req.body.vehiclenumber })
        if (exist) {

            req.files.map((image) => {
                const imagePath = image.path;
                fs.unlink(imagePath, (error) => {
                    if (error) {
                        console.error('Error deleting image:', error);
                    } else {
                        console.log('Image deleted successfully');
                    }
                });
            })
            res.json({ status: false, message: "The vehicle number already exist" })
        } else {
            const images = req.files
            const imageURLs = images.map((image) => {
                let imagePath = image.path;
                let modifiedImagePath = imagePath.replace(/^public[\\/]+/, '');
                return modifiedImagePath;
            })
            const newVehicle = new vehicleModel({
                vehiclenumber: req.body.vehiclenumber,
                modelname: req.body.modelname,
                modelyear: req.body.modelyear,
                brand: req.body.brand,
                fueltype: req.body.fueltype,
                drivenKM: req.body.TotalKm,
                transmissiontype: req.body.transmissionType,
                rentfor30days: req.body.rent30daysormore,
                rentfor10_20days: req.body.rent10to20days,
                rentupto10days: req.body.rentupto10days,
                categoryId: req.body.category,
                hub: req.body.hub,
                image_url: imageURLs,

            })
            newVehicle.save().then(() => {
                res.json({ status: true, message: "Vehicle added successfully" })
            })
        }
    } catch (error) {
        res.json({ status: false, message: error.message })
    }
}

module.exports.listUsers = async (req, res, next) => {
    try {
        const users = await userModel.find({}).sort({ _id: -1 });
        if (users) {
            res.json({ status: true, users })
        } else {
            res.json({ status: false, message: "No users Found" })
        }
    } catch (error) {
        res.json({ status: false, message: error.message })
    }
}

module.exports.addCategory = async (req, res, next) => {
    const imagePath = req.files.image[0].path
    const modifiedImagePath = imagePath.replace(/^public[\\/]+/, '');
    try {
        const exist = await categoryModel.findOne({ categoryName: req.body.categoryName })
        if (exist) {
            fs.unlink(imagePath, (error) => {
                if (error) {
                    console.error('Error deleting image:', error);
                } else {
                    console.log('Image deleted successfully');
                }
            });
            res.json({ status: false, message: "Category Name already exist" })
        } else {
            const newCategory = new categoryModel({
                categoryName: req.body.categoryName,
                imageUrl: modifiedImagePath
            })
            const category = await newCategory.save()

            res.json({ status: true, message: "Category added successfully", category })

        }

    } catch (error) {
        res.json({ status: false, message: error.message })
    }
}

module.exports.ListCategories = async (req, res, next) => {
    try {
        const categories = await categoryModel.find({}).sort({ _id: -1 });
        if (categories) {
            res.json({ status: true, categories })
        } else {
            res.json({ status: false, message: "NOTHING FOUND" })
        }
    } catch (error) {
        res.json({ status: false, message: error.message })
    }
}

module.exports.viewVehicleDetails = async (req, res, next) => {
    try {
        const vehicleId = req.params.id;
        const vehicle = await vehicleModel.findOne({ _id: vehicleId }).populate("categoryId").populate("hub")
        if (vehicle) {
            res.json({ status: true, vehicle })
        } else {
            res.json({ status: false, message: "Something went wrong" })
        }
    } catch (error) {
        res.json({ status: false, message: error.message })
    }
}

module.exports.editCar = async (req, res, next) => {
    try {
        const vehicleId = req.params.id
        if (req.files) {

            req.files.map(async (image) => {
                let index = parseInt(image.originalname.slice(5));
                const vehicle = await vehicleModel.findOne({ _id: vehicleId })
                let imagePath = `public/${vehicle.image_url[index]}`
                fs.unlink(imagePath, (error) => {
                    if (error) {
                        console.error('Error deleting image:', error);
                    } else {
                        console.log('Image deleted successfully');
                    }
                });
                let newimagePath = image.path;
                let modifiedImagePath = newimagePath.replace(/^public[\\/]+/, '');
                await vehicleModel.findOneAndUpdate(
                    { _id: vehicleId },
                    { $set: { [`image_url.${index}`]: modifiedImagePath } },
                    { new: true }
                );

            })
        }
        await vehicleModel.findOneAndUpdate(
            { _id: vehicleId },
            {
                $set: {
                    vehiclenumber: req.body.vehiclenumber,
                    modelname: req.body.modelname,
                    brand: req.body.brand,
                    fueltype: req.body.fueltype,
                    drivenKM: req.body.TotalKm,
                    transmissiontype: req.body.transmissionType,
                    rentfor30days: req.body.rent30daysormore,
                    rentfor10_20days: req.body.rent10to20days,
                    rentupto10days: req.body.rentupto10days,
                    categoryId: req.body.category,
                    hub: req.body.hub,
                    modelyear: req.body.modelyear
                }
            },
            { new: true }
        )

        res.json({ status: true, message: "Vehicle Details updated Succesfully" })

    } catch (error) {
        console.log(error);
    }
}

module.exports.deleteVehicle = async (req, res, next) => {
    try {
        const vehicleId = req.params.id
        const vehicle = await vehicleModel.findOne({ _id: vehicleId })
        if (vehicle) {
            vehicle.activeStatus = !vehicle.activeStatus
            await vehicle.save()
            res.json({ status: true, message: "vehicle disabled", vehicle })
        } else {
            res.json({ status: false, message: "vehicle not found" })
        }
        // if (vehicle) {
        //     const images = vehicle.image_url
        //     images.map((image) => {
        //         let imagePath = `public/${image}`
        //         fs.unlink(imagePath, (error) => {
        //             if (error) {
        //                 console.error('Error deleting image:', error);
        //             } else {
        //                 console.log('Image deleted successfully');
        //             }
        //         });
        //     })
        //     await vehicleModel.findOneAndDelete({ _id: vehicleId });
        //     res.json({ status: true, message: "Vehicle deleted" })
        // } else {
        //     res.json({ status: false, message: "Something went wrong" })
        // }
    } catch (error) {
        res.json({ status: false, message: error.message })
    }
}

module.exports.addHub = async (req, res, next) => {
    const imagePath = req.files.image[0].path
    const modifiedImagePath = imagePath.replace(/^public[\\/]+/, '');
    try {
        const newHub = new hubModel({
            hubName: req.body.hubname,
            buildingName: req.body.buildingname,
            district: req.body.district,
            street: req.body.street,
            pincode: req.body.pincode,
            imageURL: modifiedImagePath
        })
        newHub.save().then(() => {
            res.json({ status: true, message: "Hub added successfully" })
        })
    } catch (error) {
        console.log(error);
    }
}
module.exports.blockUser = async (req, res, next) => {
    try {
        const userId = req.params.id
        const user = await userModel.findOne({ _id: userId })
        if (!user) {
            res.json({ status: false, message: "User Not Found" })
        } else {
            user.blockStatus = !user.blockStatus
            await user.save()
            res.json({ status: true, message: "User block status updated", user })
        }

    } catch (error) {
        console.log(error);
    }
}

module.exports.getHubs = async (req, res, next) => {
    try {
        const hubs = await hubModel.find({})
        if (hubs) {
            res.json({ status: true, hubs })
        } else {
            res.json({ status: false, message: "No Hubs found" })
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports.ViewHub = async (req, res, next) => {
    try {
        const hubId = req.params.id
        const hub = await hubModel.findOne({ _id: hubId })
        if (hub) {
            res.json({ status: true, hub })
        } else {
            res.json({ status: false, message: "Hub not found" })
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports.EditHub = async (req, res, next) => {
    try {
        const hubId = req.params.id
        const hub = await hubModel.findOne({ _id: hubId })
        await hubModel.findOneAndUpdate(
            { _id: hubId },
            {
                $set: {
                    hubName: req.body.hubname,
                    buildingName: req.body.buildingname,
                    district: req.body.district,
                    street: req.body.street,
                    pincode: req.body.pincode
                }
            }
        )
        if (req.files.image) {
            const imagePath = req.files.image[0].path
            const modifiedImagePath = imagePath.replace(/^public[\\/]+/, '');
            const hub = await hubModel.findOne({ _id: hubId })
            const deleteImagePath = `public/${hub.imageURL}`
            fs.unlink(deleteImagePath, (error) => {
                if (error) {
                    console.error('Error deleting image:', error);
                } else {
                    console.log('Image deleted successfully');
                }
            });

            await hubModel.findOneAndUpdate(
                { _id: hubId },
                { $set: { imageURL: modifiedImagePath } })
        }
        res.json({ status: true, message: "Hub edited successfully" })
    } catch (error) {
        console.log(error);
    }
}

module.exports.listBookings = async (req, res, next) => {
    try {
        const bookings = await orderModel.find({}).populate("user_id").populate("vehicle_id").populate("Hub").sort({ _id: -1 });
        if (bookings) {
            res.json({ status: true, bookings })
        } else {
            res.json({ status: false, message: "Something went wrong" })
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports.getOrderDetails = async (req, res, next) => {
    try {
        const orderId = req.params.id
        const order = await orderModel.findOne({ _id: orderId }).populate("user_id").populate("vehicle_id").populate("Hub")

        if (order) {
            res.json({ status: true, order })
        } else {
            res.json({ status: false, message: "Something went wrong" })
        }
    } catch (error) {
        console.log(error);
        res.json({ status: false, message: "Internal server Error" })
    }
}
module.exports.changeOrderStatus = async (req, res, next) => {
    try {
        const orderId = req.params.id
        const order = await BookingModel.findOne({ _id: orderId })
        const vehicle_id = order.vehicle_id._id

        if (req.body.idx === 2) {
            const idx = 2;
            await orderModel.findOneAndUpdate({ _id: orderId }, { $set: { status: "pickedup" } })
            res.json({ status: true, idx })
        }
        if (req.body.idx === 3) {
            const idx = 3;
            await orderModel.findOneAndUpdate({ _id: orderId }, { $set: { status: "dropedoff" } })
            await vehicleModel.findOneAndUpdate({ _id: vehicle_id }, { $set: { bookedStatus: false } })
            res.json({ status: true, idx })
        }

    } catch (error) {
        console.log(error);
    }
}

module.exports.AdminDashBoard = async (req, res, next) => {
    try {
        const bookingCountPerDay = await BookingModel.aggregate([
            {
                $addFields: {
                    bookedAtDate: { $toDate: "$booked_At" },
                },
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$bookedAtDate" } },
                    count: { $sum: 1 },
                },
            },
        ]);

        // bookingCountPerDay.reverse()
        bookingCountPerDay.sort((a, b) => new Date(a._id) - new Date(b._id));
        const totalUser = await userModel.countDocuments({})
        const totalVehicle = await vehicleModel.countDocuments({})
        const totalOrders = await BookingModel.countDocuments({})
        if (bookingCountPerDay) {
            res.json({ status: true, bookingCountPerDay ,totalUser,totalVehicle,totalOrders})
        } else {
            res.json({ status: false, message: "Something went wrong" })
        }


    } catch (error) {
        console.log(error);
        res.json({ status: false, message: "Internal Server Error" })

    }
}