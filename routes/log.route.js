const express = require("express")
const { logsByLead, getLog } = require("../controllers/log.controller")
const router = express.Router()

// middlewares
const { checkToken } = require('../middleware/token_validation');

// controllers



// routes
router.get('/:id',checkToken, logsByLead)
router.get('/', getLog)

module.exports = router