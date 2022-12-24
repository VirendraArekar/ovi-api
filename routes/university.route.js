const express = require("express")
const router = express.Router()


// controllers
const { createUniversity, isActiveToggle, getUniversity, updateUniversity, deleteUniversity } = require('../controllers/university.controller')


// routes
router.post('/create', createUniversity)
router.put('/isactivetoggle/:id', isActiveToggle)
router.get('/all', getUniversity)
router.put('/update/:id', updateUniversity)
router.delete('/delete/:id', deleteUniversity)

module.exports = router