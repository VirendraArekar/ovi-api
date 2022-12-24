const College = require('../models/college.model')

exports.createCollege = async (req, res, next) => {
    try {
        const college = new College(req.body);
        const savedCollege = await college.save();
        res.status(200).send({
            success: true,
            data: savedCollege,
            message: "College Created Successfully"
        })
    } catch (error) {
        next(error)
    }
}

exports.getCollegeByCountry = async (req, res, next) =>{
    try{
        const data = await College.find({ country: req.params.id }).sort({ createdAt: -1 }).populate('city country')
        res.status(200).send({
            success: true,
            data,
            message:"College fetched successfully"
        })
    }catch(error){
        next(error)
    }
}

exports.getColleges = async (req, res, next) => {
    try {
        const page = req.query.page || 1;
        const rowsperpage = req.query.rowsperpage;
        const colleges = await College.find({})
            .skip(rowsperpage * (page - 1))
            .limit(rowsperpage)
            .sort({ createdAt: -1 })
        res.status(200).send({
            success: true,
            data: colleges,
            message: "Colleges Fetched Successfully"
        })
    } catch (error) {
        next(error)
    }
}

exports.updateCollege = async (req, res, next) => {
    try {
        const updated = await College.findByIdAndUpdate(req.params.id, req.body, { new: true }).exec()
        res.status(200).send({
            success: true,
            data: updated,
            message: "College updated successfully"
        })
    } catch (error) {
        next(error)
    }
}

exports.deleteCollege = async (req, res, next) => {
    try {
        const deleted = await College.findByIdAndDelete(req.params.id)
        res.status(200).send({
            success: true,
            data: deleted,
            message: "College deleted successfully"
        })
    } catch (error) {
        next(error)
    }
}