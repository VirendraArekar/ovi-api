const Log = require('../models/log.model')

exports.logsByLead = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await Log.find({ lead: id })
        res.status(200).send({
            success: true,
            data,
            message:"Logs fetched successfully"
        })
    } catch (error) {
        next(error)
    }
}
exports.getLog = async (req, res, next) => {
    try {
        const data = await Log.find({}).sort({createdAt:-1})
        res.status(200).send({
            success: true,
            data,
            message:"Logs fetched successfully"
        })
    } catch (error) {
        next(error)
    }
}
