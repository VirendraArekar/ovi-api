const express = require("express")
const router = express.Router()


// controllers
const {  isActiveToggle, createQualification, getQualifications, updateQualification, deleteQualification } = require('../controllers/qualification.controller')


// routes
router.post('/create', createQualification)
router.put('/isactivetoggle/:id', isActiveToggle)
router.get('/all', getQualifications)
router.put('/update/:id', updateQualification)
router.delete('/delete/:id', deleteQualification)

module.exports = router