const mongoose = require('mongoose')

const CountrySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    status:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EnquiryStatus',
    }],
    region:{
        type:String
    },
    date:{
        type: Date
    },
    addedBy:{
        type:String
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Country', CountrySchema);