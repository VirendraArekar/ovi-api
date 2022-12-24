const Permission = require('../models/permission.model')

exports.createPermission = async (req, res, next) => {
    try {
        const permission = new Permission(req.body);
        const savedPermission = await permission.save();
        res.status(200).send({
            success: true,
            data: savedPermission,
            message: "Permission Created Successfully"
        })
    } catch (error) {
        next(error)
    }
}

exports.getPermissions = async (req, res, next) => {
    try {
        const page = req.query.page || 1;
        const allPermissions = await Permission.find({})
        const rowsperpage = req.query.rowsperpage || allPermissions.length;
        const permissions = await Permission.find({})
            .skip(rowsperpage * (page - 1))
            .limit(rowsperpage)
            .sort({ createdAt: -1 })
            .exec();
        res.status(200).send({
            success: true,
            data: permissions,
            page,
            rowsperpage,
            numberOfRecords: allPermissions.length,
            message: "Roles Fetched Successfully"
        })
    } catch (error) {
        next(error)
    }
}

exports.updatePermission = async (req, res, next) => {
    try {
        const updated = await Permission.findByIdAndUpdate(req.params.id, req.body, { new: true }).exec()
        res.status(200).send({
            success: true,
            data: updated,
            message: "Permission updated successfully"
        })
    } catch (error) {
        next(error)
    }
}

exports.deletePermission = async (req, res, next) => {
    try {
        const deleted = await Permission.findByIdAndDelete(req.params.id)
        res.status(200).send({
            success: true,
            data: deleted,
            message: "Permission deleted successfully"
        })
    } catch (error) {
        next(error)
    }
}