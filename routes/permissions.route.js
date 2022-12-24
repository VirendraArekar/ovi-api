const express = require("express")
const { createPermission, getPermissions, updatePermission, deletePermission } = require("../controllers/permission.controller")
const router = express.Router()

// middlewares
// const { checkToken } = require('../middleware/token_validation');

// controllers



// routes
router.post('/create', createPermission)
router.get('/all', getPermissions)
router.put('/:id', updatePermission)
router.delete('/:id', deletePermission)

module.exports = router