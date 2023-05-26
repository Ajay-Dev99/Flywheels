const mongoose = require('mongoose')


const vehicleSchema = new mongoose.Schema({
    vehiclenumber:{
        type:String,
        required:true,
        unique:true
    },
    modelname:{
        type:String,
        required:true
    },
    brand:{
        type:String,
        required:true
    },
    fueltype:{
        type:String,
        required:true
    },
    drivenKM:{
        type:String,
        required:true
    },
    transmissiontype:{
        type:String,
        required:true
    },
    rentfor30days:{
        type:Number,
        required:true
    },
    rentfor10_20days:{
        type:Number,
        required:true
    },
    rentupto10days:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    image_url:{
        type:String,
        // required:true
    },
    status:{
        type:Boolean,
        default:true
    }

})

module.exports = new mongoose.model("vehicle",vehicleSchema)