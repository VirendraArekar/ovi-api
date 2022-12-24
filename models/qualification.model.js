const mongoose = require("mongoose")

const QualificationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    country: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Country",
        required: true
    }],
    date:{
        type:Date,
    },
    addedBy:{
        type:String
    },
    isActive:{
        type:Boolean,
        required: true,
        default:true
    }
},{timestamps: true})

module.exports = mongoose.model('Qualification', QualificationSchema);