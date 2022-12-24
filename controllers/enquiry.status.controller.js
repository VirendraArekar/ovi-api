const EnquiryStatus = require('../models/enquiry.status.model')

exports.createEnquiryStatus = async (req, res, next) => {
    try {
        const enquiryStatus = new EnquiryStatus(req.body);
        const savedEnquiryStatus = await enquiryStatus.save();
        res.status(200).send({
            success: true,
            data: savedEnquiryStatus,
            message: "EnquiryStatus Created Successfully"
        })
    } catch (error) {
        next(error)
    }
}

exports.getEnquiryStatus = async (req, res, next) => {
    try {
        const page = req.query.page || 1;
        const rowsperpage = req.query.rowsperpage;
        const enquiryStatus = await EnquiryStatus.find({})
            .skip(rowsperpage * (page - 1))
            .limit(rowsperpage)
            .sort({ createdAt: -1 })
        res.status(200).send({
            success: true,
            data: enquiryStatus,
            message: "EnquiryStatus Fetched Successfully"
        })
    } catch (error) {
        next(error)
    }
}

exports.updateEnquiryStatus = async (req, res, next) => {
    try {
        const updated = await EnquiryStatus.findByIdAndUpdate(req.params.id, req.body, { new: true }).exec()
        res.status(200).send({
            success: true,
            data: updated,
            message: "EnquiryStatus updated successfully"
        })
    } catch (error) {
        next(error)
    }
}

exports.deleteEnquiryStatus = async (req, res, next) => {
    try {
        const deleted = await EnquiryStatus.findByIdAndDelete(req.params.id)
        res.status(200).send({
            success: true,
            data: deleted,
            message: "EnquiryStatus deleted successfully"
        })
    } catch (error) {
        next(error)
    }
}