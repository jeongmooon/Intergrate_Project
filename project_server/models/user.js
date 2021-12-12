const mongoose = require('mongoose');

const { Schema } = mongoose;
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    name:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    createAt:{
        type: Date,
        default: Date.now,
    },
    salt:{
        type:String,
        required:true,
    },
    signinCount:{
        type:Number,
        default:0
    },
    lockAccount:{
        type: Boolean,
        default:false,
    }
})

module.exports = mongoose.model("User", userSchema)