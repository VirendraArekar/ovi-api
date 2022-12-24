const express = require("express")
const { createCollege, getColleges, updateCollege, deleteCollege, getCollegeByCountry } = require("../controllers/college.controller")
const router = express.Router()

// routes
router.post('/create', createCollege)
router.get('/all', getColleges)
router.get('/collegebycountry/:id', getCollegeByCountry)
router.put('/update/:id', updateCollege)
router.delete('/delete/:id', deleteCollege)

module.exports = router