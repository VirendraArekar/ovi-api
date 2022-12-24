const mongoose = require("mongoose");

const Councellor = new mongoose.Schema({
    profilePhoto: {
        type: String,
        required: true,
        default: "https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-512.png",
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true
    },
    mobile:{
        type:Number,
        required: true
    },
    designation:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Designation",
    },
    branch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Branch",
    },
    date:{
        type:Date,
    },
    type:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "CounsellorType",
    },
    destination:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Country",
    },
    isActive:{
        type:Boolean,
        required:true,
        default: true
    }
    
}, { timestamps: true, });

module.exports = mongoose.model('Councellors', Councellor);