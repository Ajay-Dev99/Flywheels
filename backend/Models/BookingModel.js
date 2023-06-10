const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    vehicle_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "vehicle",
        required: true,
    },
    booked_At:{
        type:String,
        required:true
    },
    deliveryType:{
        type:String,
        required:true
    },
    deliveryDetails:[{
        address:{
            type:String
        },
        district:{
            type:String
        },
        homeTown:{
            type:String
        },
        pincode:{
            type:Number
        }
    }],
    fromDate:{
        type:String
    },
    toDate:{
        type:String
    },
    deliveryTime:{
        type:String
    },
    Hub:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "hub"
    },
    payment_id:{
        type:String
    }
})

module.exports = new mongoose.model("booking",bookingSchema)