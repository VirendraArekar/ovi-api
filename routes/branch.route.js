const express = require("express")
const router = express.Router()


// controllers
const { createBranch, getBranches, updateBranch, deleteBranch, isActiveToggle } = require('../controllers/branch.controller')


// routes
router.post('/create', createBranch)
router.put('/isactivetoggle/:id', isActiveToggle)
router.get('/all', getBranches)
router.put('/update/:id', updateBranch)
router.delete('/delete/:id', deleteBranch)

module.exports = router