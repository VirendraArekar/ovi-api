const express = require("express")
const { createRole, getRoles, updateRole, deleteRole } = require("../controllers/roles.controller")
const router = express.Router()

// const { checkToken } = require('../middleware/token_validation');

// routes
router.post('/create',createRole)
router.get('/all', getRoles)
router.put('/:id', updateRole)
router.delete('/:id', deleteRole)

module.exports = router