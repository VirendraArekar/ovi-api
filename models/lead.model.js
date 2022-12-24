const mongoose = require("mongoose");

const Lead = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    mobile: {
        type: Number,
        required: true,
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
        ref: 'Designation',
    },
    leadType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SourceType',
        required: true,
    },
    counsellor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    leadSource: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Source',
    },
    qualification: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Qualification',
    },
    backlogs: Number,
    cityOfCollege: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'City',
    },
    education: [{
        college:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'College',
        },
        intakeInterested: [Date],
        countryInterested: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Country',
        },
        programmeInterested: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Programme',
        }],
        status: {
            name: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'EnquiryStatus',
            },
            comment: {
                type: String,
            }
        }
    }],
    experience: String,
    proofOfFunds: String,
    incomeProof: String,
    referenceBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lead',
    },
    branch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Branch',
        required: true
    },
    assignTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    // createdBy:{
    //     type:String
    // },
    description: String,
    status: {
        name: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'EnquiryStatus',
        },
        comment: {
            type: String,
        }
    }
}, { timestamps: true, });

module.exports = mongoose.model('Lead', Lead);