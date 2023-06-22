const mongoose = require("mongoose")

const hubSchema = new mongoose.Schema({
    hubName: {
        type: String,
        required: true
    },
    buildingName: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    pincode: {
        type: Number,
        required: true
    },
    imageURL: {
        type: String,
        required: true
    }
})

module.exports = new mongoose.model("hub", hubSchema)