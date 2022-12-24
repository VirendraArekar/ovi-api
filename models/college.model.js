const mongoose = require('mongoose')

const CollegeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    country: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Country"
    },
    date: {
        type: Date,
    },
    addedBy: {
        type: String
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    }
}, { timestamps: true })

module.exports = mongoose.model('College', CollegeSchema);