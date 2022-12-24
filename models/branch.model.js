const mongoose = require('mongoose')

const BranchSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    addedBy: {
        type: String
    },
    date: { type: Date },
    state: { type: String },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Branch', BranchSchema);