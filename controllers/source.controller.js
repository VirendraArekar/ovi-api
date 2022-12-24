const SourceModel = require('../models/source.model')
const mongoose = require("mongoose")

exports.createSource = async (req, res , next) => {
    try {
        const sources = new SourceModel(req.body)
        const savedSource = await sources.save();
        res.status(200).send({
            success: true,
            data: savedSource,
            message: "Source Created Successfully"
        })
    } catch (error) {
        next(error)
    }
}

exports.getSource = async (req, res , next) => {
    try {
        const page = req.query.page || 1;
        const rowsperpage = req.query.rowsperpage;
        const source = await SourceModel.find({})
            .skip(rowsperpage * (page - 1))
            .limit(rowsperpage)
            .sort({ createdAt: -1 })
            .exec();
        res.status(200).send({
            success: true,
            data: source,
            message: "Source Fetched Successfully"
        })
    } catch (error) {
        next(error)
    }
}

exports.updateSource = async (req, res , next) => {
    try {
        const { id } = req.params;
        const updated = await SourceModel.findOneAndUpdate({ _id: id }, req.body, { new: true })
        res.status(200).send({
            success: true,
            data: updated,
            message: " Source updated Successfully"
        })
    } catch (error) {
        next(error)
    }
}

exports.deleteSource =async (req, res, next) =>{
    try{
        const deleted = await SourceModel.findByIdAndDelete(req.params.id);
        res.status(200).send({
            success: true,
            data:deleted,
            message:"Source Deleted Successfully"
        })
    }catch(error){
        next(error)
    }
}

// is Active toggle
exports.isActiveToggle = async (req, res, next) => {
    const { id } = req.params;
    try {
        const objectId = new mongoose.Types.ObjectId(id);
        const updated = await SourceModel.findOneAndUpdate({ _id: objectId }, [{ $set: { isActive: { $eq: [false, "$isActive"] } } }], { new: true });
        res.status(200).send({
            isActive: updated.isActive
        })
    } catch (error) {
        next(error)
    }
}
