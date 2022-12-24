const mongoose = require("mongoose");

const Programme = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        index: true
    }
}, { timestamps: true, });

module.exports = mongoose.model('Programme', Programme);