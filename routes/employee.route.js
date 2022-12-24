const express = require("express")
const { createEmployee, getEmployee, updateEmployee, deleteEmployee } = require("../controllers/employee.controller")
const router = express.Router()

// routes
router.post('/create', createEmployee)
router.get('/all', getEmployee)
router.put('/:id', updateEmployee)
router.delete('/:id', deleteEmployee)

module.exports = router