const CounsellorType = require('../models/counsellor.type.model')

exports.createCounsellorType = async (req, res, next) => {
    try {
        const counsellorType = new CounsellorType(req.body);
        const savedCounsellorType = await counsellorType.save();
        res.status(200).send({
            success: true,
            data: savedCounsellorType,
            message: "CounsellorType Created Successfully"
        })
    } catch (error) {
        next(error)
    }
}

exports.getCouncellorType = async (req, res, next) => {
    try {
        const page = req.query.page || 1;
        const rowsperpage = req.query.rowsperpage;
        const counsellorTypes = await CounsellorType.find({})
            .skip(rowsperpage * (page - 1))
            .limit(rowsperpage)
            .sort({ createdAt: -1 })
        res.status(200).send({
            success: true,
            data: counsellorTypes,
            message: "CounsellorTypes Fetched Successfully"
        })
    } catch (error) {
        next(error)
    }
}

exports.updateCounsellorType = async (req, res, next) => {
    try {
        const updated = await CounsellorType.findByIdAndUpdate(req.params.id, req.body, { new: true }).exec()
        res.status(200).send({
            success: true,
            data: updated,
            message: "CounsellorType updated successfully"
        })
    } catch (error) {
        next(error)
    }
}

exports.deleteCounsellorType = async (req, res, next) => {
    try {
        const deleted = await CounsellorType.findByIdAndDelete(req.params.id)
        res.status(200).send({
            success: true,
            data: deleted,
            message: "CounsellorType deleted successfully"
        })
    } catch (error) {
        next(error)
    }
}