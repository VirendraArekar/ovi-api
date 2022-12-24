const mongoose = require("mongoose")

const EmployeeSchema = new mongoose.Schema({
    firstName: {
        trim: true,
        type: String,
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
    designation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Designation",
        required: true,
    },
    joiningDate: {
        type: Date,
    },
    isActive:{
        type:Boolean,
        required: true,
        default: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Employee', EmployeeSchema);