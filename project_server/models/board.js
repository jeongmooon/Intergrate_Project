const mongoose = require('mongoose');

const { Schema } = mongoose;

const {
    Type: { ObjectId }
} = Schema;

const boardSchema = new Schema({
    writer : {
        type : ObjectId,
        required : true,
        ref :"User"
    },
    title:{
        type:String,
        required: true,
    },
    content:{
        type:String,
        required:true,
    },
    createAt:{
        type:Date,
        default: Date.now,
    },
})

module.exports = mongoose.model("Board", boardSchema);