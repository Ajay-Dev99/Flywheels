const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone_number:{
        type:Number,
        required:true,
        index:{unique:true}
    },
    password:{
        type:String,
        required:true
    }
})

userSchema.pre('save',async function (next){
    const user = this;
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();
    const salt=await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password,salt)
    next()
})

module.exports = new mongoose.model("user",userSchema)