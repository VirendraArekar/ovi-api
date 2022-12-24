const Designation = require('../models/designation.model')

exports.createDesignation = async (req, res, next) => {
    try {
        const designation = new Designation(req.body);
        const savedDesignation = await designation.save();
        res.status(200).send({
            success: true,
            data: savedDesignation,
            message: "Designation Created Successfully"
        })
    } catch (error) {
        next(error)
    }
}

exports.getDesignation = async (req, res, next) => {
    try {
        const page = req.query.page || 1;
        const rowsperpage = req.query.rowsperpage;
        const designations = await Designation.find({})
            .skip(rowsperpage * (page - 1))
            .limit(rowsperpage)
            .sort({ createdAt: -1 })
        res.status(200).send({
            success: true,
            data: designations,
            message: "Designations Fetched Successfully"
        })
    } catch (error) {
        next(error)
    }
}

exports.updateDesignation = async (req, res, next) => {
    try {
        const updated = await Designation.findByIdAndUpdate(req.params.id, req.body, { new: true }).exec()
        res.status(200).send({
            success: true,
            data: updated,
            message: "Designation updated successfully"
        })
    } catch (error) {
        next(error)
    }
}

exports.deleteDesignation = async (req, res, next) => {
    try {
        const deleted = await Designation.findByIdAndDelete(req.params.id)
        res.status(200).send({
            success: true,
            data: deleted,
            message: "Designation deleted successfully"
        })
    } catch (error) {
        next(error)
    }
}