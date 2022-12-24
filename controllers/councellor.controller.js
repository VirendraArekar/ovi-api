const CouncellorModel = require("../models/councellor.model")
const { default: mongoose } = require("mongoose");

const create = async (req, res, next) => {
    const {
        firstName,
        lastName,
        designation,
        destination,
        branch,
        email,
        mobile,
        isActive
    } = req.body
    try {
        let councellor;
        if (req.file) {
            const baseUrl = `${req.protocol}://${req.headers.host}`;
            const fullPath = `${baseUrl}/uploads/counsellor/${req.file?.filename}`
            councellor =  new CouncellorModel({
                firstName,
                lastName,
                designation,
                destination,
                branch,
                email,
                mobile,
                isActive,
                profilePhoto: fullPath
            })
        } else {
            councellor = new CouncellorModel(req.body)
        }
        const savedCouncellor = await councellor.save()
        res.status(200).send({
            success: true,
            data: savedCouncellor,
            message: "Councellor Created Sucessfully"
        })
    } catch (error) {
        next(error)
    }
}

const counsellorByBranchId = async (req, res, next) => {
    try {
        const { id } = req.params
        const branch = mongoose.Types.ObjectId(id)
        let counsellor = await CouncellorModel.find({ branch}).populate('designation branch destination').exec()
        res.send({
            success: true,
            data:counsellor,
            message: "Counsellor fetched successfully"
        })
    } catch (error) {
        next(error)
    }
}

// councellor by name
const read = async (req, res, next) => {
    try {
        let councellor = await CouncellorModel.findOne({ _id: req.params.id }).exec();
        res.status(200).send({
            success: true,
            data: councellor,
            message: "Councellor fetched successfully"
        })
    } catch (error) {
        next(error)
    }
}

// update councellor by name 
const update = async (req, res, next) => {
    try {
        let updated;
        if (req.file) {
            const baseUrl = `${req.protocol}://${req.headers.host}`;
            const fullPath = `${baseUrl}/uploads/${req.file?.filename}`
            updated = await CouncellorModel.findOneAndUpdate({ _id: req.params.id }, {
                profilePhoto:fullPath,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                mobile: req.body.mobile,
                designation: req.body.designation,
                branch: req.body.branch,
                date: req.body.date,
                type: req.body.type,
                destination: req.body.destination,
                isActive: req.body.isActive
            }, { new: true })
        } else {
            updated = await CouncellorModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
        }
        res.status(200).send({
            success: true,
            data: updated,
            message: "Councellor updated successfully"
        })
    } catch (error) {
        next(error)
    }
}

// delete councellor 
const remove = async (req, res, next) => {
    try {
        const deleted = await CouncellorModel.findOneAndDelete({ _id: req.params.id });
        res.status(200).send({
            success: true,
            data: deleted,
            message: "Councellor deleted successfully"
        })
    } catch (error) {
        next(error)
    }
}

// all councellor
const list = async (req, res, next) => {
    try {
        const page = req.query.page || 1;
        const allCouncellor = await CouncellorModel.find({})
        const rowsperpage = req.query.rowsperpage || allCouncellor.length;
        const councellor = await CouncellorModel.find({})
            .skip(rowsperpage * (page - 1))
            .limit(rowsperpage)
            .populate('branch designation destination')
            .sort({ createdAt: -1 })
            .exec()
        res.status(200).send({
            success: true,
            data: councellor,
            page,
            rowsperpage,
            numberOfRecords: allCouncellor.length,
            message: "Councellor fetched successfully"
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    create,
    read,
    counsellorByBranchId,
    update,
    remove,
    list
}