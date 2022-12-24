const LeadModel = require("../models/lead.model")
const Log = require("../models/log.model")
const mongoose = require('mongoose');
const User = require('../models/user.model');
const { sendMail } = require("../utils/send_email");

//Create Lead
exports.createLead = async (req, res, next) => {
    try {
        console.log('Our Parameters', req.body)
        console.log(req.body.education[0].status)
        let lead;
        if (req.files) {
            const baseUrl = `${req.protocol}://${req.headers.host}`;
            lead = new LeadModel({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                mobile: req.body.mobile,
                email: req.body.email,
                designation: req.body.designation,
                programmeInterested: req.body.programmeInterested,
                leadType: req.body.leadType,
                branch:req.body.branch,
                counsellor: req.body.counsellor,
                leadSource: req.body.leadSource,
                qualification: req.body.qualification,
                backlogs: req.body.backlogs,
                cityOfCollege: req.body.cityOfCollege,
                education: req.body.education,
                countryInterested: req.body.countryInterested,
                experience: req.body.experience,
                intakeInterested: req.body.intakeInterested,
                assignTo: req.body.assignTo,
                description: req.body.description,
                proofOfFunds: req.files.proofOfFunds && `${baseUrl}/uploads/lead/${req.files.proofOfFunds[0].filename}`,
                incomeProof: req.files.incomeProof &&  `${baseUrl}/uploads/lead/${req.files.incomeProof[0].filename}`
            })
        } else {
            lead = new LeadModel(req.body)
        }
        const savedLead = await lead.save();
        const log = new Log({
            lead: savedLead._id,
            by:req.user._id,
        })
        await log.save().
        then((response) => {
            console.log('Log ')
            console.log(response)
        })
        .catch((error) => {
            console.log('Log Error')
            console.log(error)
        })
        res.status(200).send({
            success: true,
            data: savedLead,
            message: "Lead Created Successfully"
        });
    } catch (error) {

        console.log('CATCH ERROR', error)
        next(error)
    }
};

exports.leadByUserId = async(req, res, next) =>{
    try{
        const { id } = req.params;
        const objectId = new mongoose.Types.ObjectId(id);
        const data = await LeadModel.find({ assignTo: objectId })
        .populate('designation status leadType counsellor leadSource qualification cityOfCollege education.college assignTo education.programmeInterested')
        
        res.status(200).send({
            success: true,
            data,
            message:"Lead fetched successfully"
        })
    }catch(error){
        next(error)
    }
}

//Find All leads
exports.findAll = async (req, res, next) => {
    try {
        const page = req.query.page || 1;
        const allLeads = await LeadModel.find({})
        const rowsperpage = req.query.rowsperpage || allLeads.length;
        const leads = await LeadModel.find({})
            .skip(rowsperpage * (page - 1))
            .limit(rowsperpage)
            .populate('designation branch education.programmeInterested leadType counsellor leadSource qualification cityOfCollege education.countryInterested assignTo education.college status.name education.status.name')
            .sort({ createdAt: -1 })
            .exec();
        res.status(200).send({
            success: true,
            data: leads,
            page,
            rowsperpage,
            numberOfRecords: allLeads.length,
            message: `Lead fetched successfully`
        })
    } catch (error) {
        next(error)
    }
};

exports.getLeadById = async (req, res, next) =>{
    try{
        const {ObjectId} = mongoose.Types
        const leadId = req.params.id;
        const lead = await LeadModel.aggregate([
            {$match:{ _id : ObjectId(leadId)}},
            { $unwind: { path: "$college"}}
        ])
        
        res.status(200).send({
            success: true,
            data:lead,
            message:"Leads fetched successfully"
        })
    }catch(error){
        next(error)
    }
}

exports.updateById = async (req, res, next) => {
    try {
        const { id } = req.params;
        let updated;
        if (req.files) {
            const baseUrl = `${req.protocol}://${req.headers.host}`;
            updated = await LeadModel.findByIdAndUpdate(id, {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                mobile: req.body.mobile,
                email: req.body.email,
                education: req.body.education,
                designation: req.body.designation,
                programmeInterested: req.body.programmeInterested,
                leadType: req.body.leadType,
                counsellor: req.body.counsellor,
                leadSource: req.body.leadSource,
                qualification: req.body.qualification,
                backlogs: req.body.backlogs,
                branch:req.body.branch,
                status:req.body.status,
                cityOfCollege: req.body.cityOfCollege,
                college: req.body.college,
                countryInterested: req.body.countryInterested,
                experience: req.body.experience,
                intakeInterested: req.body.intakeInterested,
                assignTo: req.body.assignTo,
                description: req.body.description,
                proofOfFunds: req.files.proofOfFunds && `${baseUrl}/uploads/lead/${req.files.proofOfFunds[0]?.filename}`,
                incomeProof: req.files.incomeProof && `${baseUrl}/uploads/lead/${req.files.incomeProof[0]?.filename}`
            }, { new: true }).populate('assignTo', '-password')
        } else {
            updated = await LeadModel.findByIdAndUpdate(id, req.body, { new: true }).populate('assignTo', '-password')
        }
        const log = new Log({
            lead: id,
            by: req.user._id,
            change: req.body
        })
        await log.save()
        if(req.body.assignTo){
            const userId = new mongoose.Types.ObjectId(req.body.assignTo);
            const user = await User.findOne({ _id: userId })
            sendMail(user.email, 'Enquiry assigned', `${updated}`)
        }
        res.status(200).send({
            success: true,
            data: updated,
            message: `Lead updated successfully`
        })
    } catch (error) {
        next(error)
    }

}

// find Lead by Councellor id
exports.findLeadByCouncellor = async (req, res, next) => {
    const { id } = req.params;
    try {
        const page = req.query.page || 1;
        const allLeads = await LeadModel.find({ counsellor: objectId })
        const rowsperpage = req.query.rowsperpage || allLeads.length;
        const objectId = new mongoose.Types.ObjectId(id);
        const enquiry = await LeadModel.find({ counsellor: objectId })
            .skip(rowsperpage * (page - 1))
            .limit(rowsperpage)
            .populate('designation status leadType counsellor branch leadSource qualification cityOfCollege college assignTo programmeInterested')
            .sort({ createdAt: -1 })
            .exec();
        res.status(200).send({
            success: true,
            data: enquiry,
            page,
            rowsperpage,
            numberOfRecords: allLeads.length,
            message: `Enquiry fetched successfully`
        })
    } catch (error) {
        next(error)
    }
}

exports.assignLead = async (req, res, next) => {
    try {
        const { id } = req.params;
        const objectId = new mongoose.Types.ObjectId(id);
        const options = { new: true }
        LeadModel.findOneAndUpdate({ _id: objectId }, req.body, options, async (error, enquiry) => {
            if (error) {
                return res.status(400).send({
                    success: false,
                    data: null,
                    message: `update failed`
                })
            } else {
                if (enquiry) {
                    
                    return res.status(200).send({
                        success: true,
                        data: enquiry,
                        message: `updated successfully`
                    })
                    // return res.send({
                    //     success: true
                    // })
                }
                res.status(400).send({
                    success: false,
                    data: null,
                    message: `User with id: ${id} update failed`
                })
            }
        })
    } catch (error) {
        next(error)
    }
}

exports.deleteLead = async (req , res, next) =>{
    try{
        const deleted = await LeadModel.findByIdAndDelete(req.params.id).exec()
        res.status(200).send({
            success: true,
            data: deleted,
            message: "Lead deleted successfully"
        })
    }catch(error){
        next(error)
    }
}

