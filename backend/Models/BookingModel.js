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
        type:String,
        required:true
    },
    toDate:{
        type:String,
        required:true
    },
    deliveryTime:{
        type:String,
        required:true
    },
    Hub:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "hub"
    },
    payment_id:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    userDocumentImageURL:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:"orderPlaced"
    },
    cancelStatus:{
        type:Boolean,
        default:false
    }
})

module.exports = new mongoose.model("booking",bookingSchema)