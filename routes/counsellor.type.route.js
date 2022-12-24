const express = require("express")
const { createCounsellorType, getCouncellorType, updateCounsellorType, deleteCounsellorType } = require("../controllers/counsellor.type.controller")
const router = express.Router()


// controllers


// routes
router.post('/create', createCounsellorType)
router.get('/all', getCouncellorType)
router.put('/update/:id', updateCounsellorType)
router.delete('/delete/:id', deleteCounsellorType)

module.exports = router