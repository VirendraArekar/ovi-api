const express = require("express")
const router = express.Router()
const { checkToken } = require('../middleware/token_validation');



// controllers
const { createSource, getSource, updateSource, deleteSource, isActiveToggle } = require('../controllers/source.controller')

// routes
router.post('/create', checkToken, createSource)
router.get('/all', getSource)
router.put('/update/:id', updateSource)
router.put('/isactivetoggle/:id', isActiveToggle)
router.delete('/delete/:id' , deleteSource)

module.exports = router