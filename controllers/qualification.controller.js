const QualificationModel = require('../models/qualification.model')
const mongoose = require('mongoose')

// Create Qualification
exports.createQualification = async (req, res , next) => {
    try {
        const qualification = new QualificationModel(req.body);
        const savedQualification = await qualification.save();
        res.status(200).send({
            success: true,
            data: savedQualification,
            message: "Qualification Created Successfully"
        })
    } catch (error) {
        next(error)
    }
}

// Get Qualifications

exports.getQualifications = async (req, res , next) => {
    try {
        const page = req.query.page || 1;
        const rowsperpage = req.query.rowsperpage;
        const qualifications = await QualificationModel.find({})
            .skip(rowsperpage * (page - 1))
            .limit(rowsperpage)
            .populate('country').sort({ createdAt: -1 }).exec()
        res.status(200).send({
            success: true,
            data: qualifications,
            message: "Qualifications Fetched Successfully"
        })
    } catch (error) {
        next(error)
    }
}

// Update Qualification
exports.updateQualification = async (req, res , next) => {
    try {
        const { id } = req.params;
        const updated = await QualificationModel.findByIdAndUpdate(id, req.body, { new: true }).populate('country').exec()
        res.status(200).send({
            success: true,
            data: updated,
            message: "Qualification Updated Successfully"
        })
    } catch (error) {
        next(error)
    }
}

// Delete Qualification
exports.deleteQualification = async (req, res , next) => {
    try {
        const { id } = req.params;
        const deleted = await QualificationModel.findByIdAndDelete(id)
        res.status(200).send({
            success: true,
            data: deleted,
            message: "Qualification deleted Successfully"
        })
    } catch (error) {
        next(error)
    }
}

exports.isActiveToggle = (req, res , next) => {
    const { id } = req.params;
    try {
        const objectId = new mongoose.Types.ObjectId(id);
        QualificationModel.findOneAndUpdate({ _id: objectId }, [{ $set: { isActive: { $eq: [false, "$isActive"] } } }], { new: true }, (err, doc) => {
            if (doc) {
                if (doc == null) {
                    return res.status(400).send("No Qualification found with this id")
                }
                return res.status(200).send({
                    isActive: doc.isActive
                })
            } else {
                return res.status(400).send({
                    success: false,
                    data: null,
                    message: err
                })
            }
        });
    } catch (error) {
        next(error)
    }
}
