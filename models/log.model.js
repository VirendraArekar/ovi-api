const mongoose = require("mongoose");

const Log = new mongoose.Schema({
    lead:{
        type:mongoose.Types.ObjectId,
        ref:'Lead',
        required:true
    },
    by:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required: true
    },
    change:{
        type:Object,
    },
}, { timestamps: true, });

module.exports = mongoose.model('Log', Log);