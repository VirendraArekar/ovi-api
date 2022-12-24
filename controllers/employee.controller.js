const Employee = require('../models/employee.model')

exports.createEmployee = async (req, res, next) => {
    try {
        const employee = new Employee(req.body);
        const savedEmployee = await employee.save();
        res.status(200).send({
            success: true,
            data: savedEmployee,
            message: "Employee created successfully"
        })
    } catch (error) {
        next(error)
    }
}

exports.getEmployee = async (req, res, next) => {
    try {
        const page = req.query.page || 1;
        const rowsperpage = req.query.rowsperpage;
        const employee = await Employee.find({})
            .skip(rowsperpage * (page - 1))
            .limit(rowsperpage)
            .sort({ createdAt: -1 })
            .exec();
        res.status(200).send({
            success: true,
            data: employee,
            message: "Employee fetched successfully"
        })
    } catch (error) {
        next(error)
    }
}

exports.updateEmployee = async (req, res, next) => {
    try {
        const updated = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true }).exec()
        res.status(200).send({
            success: true,
            data: updated,
            message: "Employee updated successfully"
        })
    } catch (error) {
        next(error)
    }
}

exports.deleteEmployee = async (req, res, next) => {
    try {
        const deleted = await Employee.findByIdAndDelete(req.params.id)
        res.status(200).send({
            success: true,
            data: deleted,
            message: "Employee deleted successfully"
        })
    } catch (error) {
        next(error)
    }
}