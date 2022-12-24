const BranchModel = require('../models/branch.model')
const mongoose = require("mongoose")

// Create Branch
exports.createBranch = async (req, res , next) => {
    try {
        const branch = new BranchModel(req.body);
        const savedBranch = await branch.save();
        res.status(200).send({
            success: true,
            data: savedBranch,
            message: "Branch Created Successfully"
        })
    } catch (error) {
        next(error)
    }
}

// Get Branch

exports.getBranches = async (req, res,next) => {
    try {
        const page = req.query.page || 1;
        const totalBranches = await BranchModel.find({})
        const rowsperpage = req.query.rowsperpage || totalBranches.length;
        const branches = await BranchModel.find({})
            .skip(rowsperpage * (page - 1))
            .limit(rowsperpage)
            .sort({ createdAt: -1 })
            .exec()
        res.status(200).send({
            success: true,
            data: branches,
            numberOfRecords: totalBranches.length,
            page,
            rowsperpage,
            message: "Branches Fetched Successfully"
        })
    } catch (error) {
        next(error)
    }
}


// Update Branch
exports.updateBranch = async (req, res ,next) => {
    try {
        const { id } = req.params;
        const updated = await BranchModel.findByIdAndUpdate(id, req.body, { new: true }).exec()
        res.status(200).send({
            success: true,
            data: updated,
            message: "Branch Updated Successfully"
        })
    } catch (error) {
        next(error)
    }
}

// Delete Branch
exports.deleteBranch = async (req, res , next) => {
    try {
        const { id } = req.params;
        const deleted = await BranchModel.findByIdAndDelete(id)
        res.status(200).send({
            success: true,
            data: deleted,
            message: "Branch deleted Successfully"
        })
    } catch (error) {
       next(error)
    }
}

// is Active toggle
exports.isActiveToggle = async (req, res , next) => {
    const { id } = req.params;
    try {
        const objectId = new mongoose.Types.ObjectId(id);
        const updated = await BranchModel.findOneAndUpdate({ _id: objectId }, [{ $set: { isActive: { $eq: [false, "$isActive"] } } }], { new: true });
        res.status(200).send({
            isActive: updated.isActive
        })
    } catch (error) {
        next(error)
    }
}
