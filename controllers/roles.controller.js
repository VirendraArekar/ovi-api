const Role = require('../models/roles.model')

exports.createRole = async (req, res, next) =>{
    try{
        const role = new Role(req.body);
        const savedRoles = await role.save();
        res.status(200).send({
            success: true,
            data: savedRoles,
            message:"Role Created Successfully"
        })
    }catch(error){
        next(error)
    }
}

exports.getRoles = async (req, res, next) =>{
    try{
        const page = req.query.page || 1;
        const rowsperpage = req.query.rowsperpage;
        const roles = await Role.find({})
            .skip(rowsperpage * (page - 1))
            .limit(rowsperpage)
            .sort({ createdAt: -1 })
        res.status(200).send({
            success: true,
            data:roles,
            message:"Roles Fetched Successfully"
        })
    }catch(error){
        next(error)
    }
}

exports.updateRole = async (req, res, next) =>{
    try{
        const updated = await Role.findByIdAndUpdate(req.params.id , req.body, {new:true}).exec()
        res.status(200).send({
            success: true,
            data:updated,
            message:"Role updated successfully"
        })
    }catch(error){
        next(error)
    }
}

exports.deleteRole = async (req, res, next) =>{
    try{
        const deleted = await Role.findByIdAndDelete(req.params.id)
        res.status(200).send({
            success: true,
            data: deleted,
            message: "Role deleted successfully"
        })
    }catch(error){
        next(error)
    }
}