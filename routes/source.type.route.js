const express = require("express")
const { createSourceType, getSourceTypes, updateSource, deleteSourceType } = require("../controllers/source.type.controller")
const router = express.Router()
// const { checkToken } = require('../middleware/token_validation');

// routes
router.post('/create',createSourceType)
router.get('/all', getSourceTypes)
router.put('/:id', updateSource)
router.delete('/:id' , deleteSourceType)

module.exports = router