const Programme = require('../models/programme.model')

exports.createProgramme = async (req, res, next) => {
    try {
        const programme = new Programme(req.body);
        const savedProgramme = await programme.save();
        res.status(200).send({
            success: true,
            data: savedProgramme,
            message: "Programme Created Successfully"
        })
    } catch (error) {
        next(error)
    }
}

exports.getProgramme = async (req, res, next) => {
    try {
        const page = req.query.page || 1;
        const rowsperpage = req.query.rowsperpage;
        const programmes = await Programme.find({})
            .skip(rowsperpage * (page - 1))
            .limit(rowsperpage)
            .sort({ createdAt: -1 })
        res.status(200).send({
            success: true,
            data: programmes,
            message: "Programme Fetched Successfully"
        })
    } catch (error) {
        next(error)
    }
}

exports.updateProgramme = async (req, res, next) => {
    try {
        const updated = await Programme.findByIdAndUpdate(req.params.id, req.body, { new: true }).exec()
        res.status(200).send({
            success: true,
            data: updated,
            message: "Programme updated successfully"
        })
    } catch (error) {
        next(error)
    }
}

exports.deleteProgramme = async (req, res, next) => {
    try {
        const deleted = await Programme.findByIdAndDelete(req.params.id)
        res.status(200).send({
            success: true,
            data: deleted,
            message: "Programme deleted successfully"
        })
    } catch (error) {
        next(error)
    }
}