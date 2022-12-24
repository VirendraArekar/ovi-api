const mongoose = require("mongoose")

const permissionSchema = new mongoose.Schema({
    module: {
        type: String,
        required: true,
        trim: true,
        uppercase: true
        
    },
    add:{
        type:String,
        uppercase: true
    },
    edit:{
        type:String,
        uppercase: true
    },
    read:{
        type:String,
        uppercase: true
    },
    delete:{
        type:String,
        uppercase: true
    },
    assign:{
        type:String,
        uppercase: true,
        default: null
    },
    upload:{
        type:String,
        uppercase: true,
        default: null
    },
    status:{
        type:String,
        uppercase: true,
        default: null
    }
},{timestamps:true})

module.exports = mongoose.model('Permission', permissionSchema);