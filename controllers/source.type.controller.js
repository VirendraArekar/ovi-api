const SourceTypeModel = require('../models/source.type.model')
const mongoose = require("mongoose")

exports.createSourceType = async (req, res, next) => {
    try {
        const sourceType = new SourceTypeModel(req.body)
        const savedSource = await sourceType.save();
        res.status(200).send({
            success: true,
            data: savedSource,
            message: "Source Type Created Successfully"
        })
    } catch (error) {
        next(error)
    }
}

exports.getSourceTypes = async (req, res, next) => {
    try {
        const page = req.query.page || 1;
        const rowsperpage = req.query.rowsperpage;
        const sourceTypes = await SourceTypeModel.find({})
            .skip(rowsperpage * (page - 1))
            .limit(rowsperpage)
            .sort({ createdAt: -1 })
            .exec();
        res.status(200).send({
            success: true,
            data: sourceTypes,
            message: "Source Types Fetched Successfully"
        })
    } catch (error) {
        next(error)
    }
}

exports.updateSource = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updated = await SourceTypeModel.findOneAndUpdate({ _id: id }, req.body, { new: true })
        res.status(200).send({
            success: true,
            data: updated,
            message: " Source Type updated Successfully"
        })
    } catch (error) {
        next(error)
    }
}

exports.deleteSourceType = async (req, res, next) => {
    try {
        const deleted = await SourceTypeModel.findByIdAndDelete(req.params.id)
        res.status(200).send({
            success: true,
            data: deleted,
            message:"Source type deleted successfully"
        })
    } catch (error) {
        next(error)
    }
}
