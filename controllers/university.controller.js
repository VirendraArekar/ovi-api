const UniversityModel = require('../models/university.model')
const mongoose = require("mongoose")


// Create Univerity
exports.createUniversity = async(req , res , next) =>{
    try{
        const university = new UniversityModel(req.body);
        const savedUniversity = await university.save();
        res.status(200).send({
            success: true,
            data: savedUniversity,
            message: "University Created Successfully"
        })
    }catch(error){
        next(error)
    }
}

// Get University

exports.getUniversity = async (req, res , next) =>{
    try {
        const page = req.query.page || 1;
        const rowsperpage = req.query.rowsperpage;
        const universities = await UniversityModel.find({})
            .skip(rowsperpage * (page - 1))
            .limit(rowsperpage)
            .sort({ createdAt: -1 })
            .exec();
        res.status(200).send({
            success: true,
            data: universities,
            message: "Universities Fetched Successfully"
        })
    } catch (error) {
        next(error)
    }
}

// Update University
exports.updateUniversity = async (req, res , next) =>{
    try{
        const { id } = req.params;
        const updated = await UniversityModel.findByIdAndUpdate(id, req.body, { new: true }).exec()
        res.status(200).send({
            success: true,
            data: updated,
            message: "University Updated Successfully"
        })
    } catch (error) {
        next(error)
    }
}

// Delete University
exports.deleteUniversity = async (req, res , next) =>{
    try{
        const { id } = req.params;
        const deleted = await UniversityModel.findByIdAndDelete(id)
        res.status(200).send({
            success: true,
            data: deleted,
            message: "University deleted Successfully"
        })
    } catch (error) {
        next(error)
    }
}

exports.isActiveToggle = (req, res , next) => {
    const { id } = req.params;
    try {
        const objectId = new mongoose.Types.ObjectId(id);
        UniversityModel.findOneAndUpdate({ _id: objectId }, [{ $set: { isActive: { $eq: [false, "$isActive"] } } }], { new: true }, (err, doc) => {
            if (err) {
                return res.status(400).send(err)
            }
            else if (doc) {
                return res.status(200).send({
                    isActive: doc.isActive
                })
            }
        });
    } catch (error) {
        next(error)
    }
}
