const mongoose = require("mongoose");

const Source = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        index: true,
        unique:true
    },
    sourceType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SourceType',
        required: true,
    },
    date:Date,
    addedBy:String,
    description:String
}, { timestamps: true, });

module.exports = mongoose.model('Source', Source);