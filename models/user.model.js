const mongoose = require("mongoose");

const User = new mongoose.Schema({
    firstName: {
        trim: true,
        type: String,
        required: true,
        default: null,
    },
    lastName: {
        trim: true,
        type: String,
        default: null,
    },
    mobile: {
        type: Number,
        requierd: true
    },
    email: {
        type: String,
        match: /^\S+@\S+\.\S+$/,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePhoto: {
        type: String,
        default: "https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-512.png",
    },
    role:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Role',
        required: true,
        default:null
    },
    company:{
        type:String,
    },
    isActive:{
        type:Boolean,
        required: true,
        default: true
    },
    designation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Designation",
    },
    destination: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Country",
    },
    branch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Branch",
    },
    reportingTo:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    date:{
        type:Date,
        required: true,
        default: new Date()
    }, 
}, { timestamps: true, });

module.exports = mongoose.model('User', User);