const express = require("express")
const { createDesignation, getDesignation, updateDesignation, deleteDesignation } = require("../controllers/designation.controller")
const router = express.Router()

// routes
router.post('/create', createDesignation)
router.get('/all', getDesignation)
router.put('/update/:id', updateDesignation)
router.delete('/delete/:id', deleteDesignation)

module.exports = router