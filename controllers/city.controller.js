const City = require('../models/city.model')

exports.createCity = async (req, res, next) => {
    try {
        const city = new City(req.body);
        const savedCity = await city.save();
        res.status(200).send({
            success: true,
            data: savedCity,
            message: "City Created Successfully"
        })
    } catch (error) {
        next(error)
    }
}

exports.getCities = async (req, res, next) => {
    try {
        const page = req.query.page || 1;
        const rowsperpage = req.query.rowsperpage;
        const city = await City.find({})
            .skip(rowsperpage * (page - 1))
            .limit(rowsperpage)
            .sort({ createdAt: -1 })
        res.status(200).send({
            success: true,
            data: city,
            message: "Cities Fetched Successfully"
        })
    } catch (error) {
        next(error)
    }
}

exports.updateCity = async (req, res, next) => {
    try {
        const updated = await City.findByIdAndUpdate(req.params.id, req.body, { new: true }).exec()
        res.status(200).send({
            success: true,
            data: updated,
            message: "City updated successfully"
        })
    } catch (error) {
        next(error)
    }
}

exports.deleteCity = async (req, res, next) => {
    try {
        const deleted = await City.findByIdAndDelete(req.params.id)
        res.status(200).send({
            success: true,
            data: deleted,
            message: "City deleted successfully"
        })
    } catch (error) {
        next(error)
    }
}