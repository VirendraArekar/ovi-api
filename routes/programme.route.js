const express = require("express")
const { createProgramme, getProgramme, updateProgramme, deleteProgramme } = require("../controllers/programme.controller")
const router = express.Router()

// routes
router.post('/create', createProgramme)
router.get('/all', getProgramme)
router.put('/update/:id', updateProgramme)
router.delete('/delete/:id', deleteProgramme)

module.exports = router