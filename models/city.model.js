const mongoose = require('mongoose')

const CitySchema = new mongoose.Schema({
    country: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'Country'
    },
    name: {
        type: String,
        required: true
    },
}, { timestamps: true })

module.exports = mongoose.model('City', CitySchema);