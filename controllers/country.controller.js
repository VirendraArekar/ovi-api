const CountryModel = require('../models/country.model')
const mongoose = require("mongoose")


// Create Country
exports.createCountry = async (req, res, next) => {
    try {
        const country = new CountryModel(req.body);
        const savedCountry = await country.save();
        res.status(200).send({
            success: true,
            data: savedCountry,
            message: "Country Created Successfully"
        })
    } catch (error) {
        next(error)
    }
}

// Get Countries

exports.getCountries = async (req, res, next) => {
    try {
        const page = req.query.page || 1;
        const rowsperpage = req.query.rowsperpage;
        const countries = await CountryModel.find({})
            .populate('status')
            .skip(rowsperpage * (page - 1))
            .limit(rowsperpage)
            .sort({ createdAt: -1 })
            .exec();
        res.status(200).send({
            success: true,
            data: countries,
            message: "Country Fetched Successfully"
        })
    } catch (error) {
        next(error)
    }
}

exports.getCountriesById = async (req, res, next) => {
    try {
        const countries = await CountryModel.findById(req.params.id)
            .populate('status')
            .exec();
        res.status(200).send({
            success: true,
            data: countries,
            message: "Country Fetched Successfully"
        })
    } catch (error) {
        next(error)
    }
}

// Update Country
exports.updateCountry = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updated = await CountryModel.findByIdAndUpdate(id, req.body, { new: true }).exec()
        res.status(200).send({
            success: true,
            data: updated,
            message: "Country Updated Successfully"
        })
    } catch (error) {
        next(error)
    }
}

// Delete Country
exports.deleteCountry = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deleted = await CountryModel.findByIdAndDelete(id)
        res.status(200).send({
            success: true,
            data: deleted,
            message: "Country deleted Successfully"
        })
    } catch (error) {
        next(error)
    }
}

exports.isActiveToggle = (req, res, next) => {
    const { id } = req.params;
    try {
        const objectId = new mongoose.Types.ObjectId(id);
        CountryModel.findOneAndUpdate({ _id: objectId }, [{ $set: { isActive: { $eq: [false, "$isActive"] } } }], { new: true }, (err, doc) => {
            if (err) {
                return res.status(400).send(err)
            }
            else if (doc) {
                return res.status(200).send({
                    isActive: doc.isActive
                })
            }
        });
    } catch (error) {
        next(error)
    }
}
