const express = require("express")
const { createEnquiryStatus, getEnquiryStatus, updateEnquiryStatus, deleteEnquiryStatus } = require("../controllers/enquiry.status.controller")
const router = express.Router()

// routes
router.post('/create', createEnquiryStatus)
router.get('/all', getEnquiryStatus)
router.put('/update/:id', updateEnquiryStatus)
router.delete('/delete/:id', deleteEnquiryStatus)

module.exports = router