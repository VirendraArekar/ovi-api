const express = require("express")
const { leadGeneratedCouncellorWise, 
    telecallerDashboard, 
    statusCountByCounsellor, 
    universityWise, 
    countryWise, 
    callData, 
    onlineCount, 
    offlineCount, 
    branchWise, 
    sourceWise, 
    counsellorData, 
    counsellor, 
    leadAssignedVsConverted,
    counsellorLeadAssignedVsConverted,
    counsellorAssigned} = require("../controllers/dashboard.controller")
const router = express.Router()


// controllers


// routes
router.get('/online-count', onlineCount)
router.get('/offline-count', offlineCount)
router.get('/assignedvsconverted', leadAssignedVsConverted)
router.get('/assignedvsconverted/:id', counsellorLeadAssignedVsConverted)
router.get('/leadbycounsellor/:id' , leadGeneratedCouncellorWise)
router.get('/telecaller', telecallerDashboard)
router.get('/call-data', callData)
router.get('/counsellor-data', counsellorData)
router.get('/counsellor', counsellor)
router.get('/university-wise', universityWise)
router.get('/country-wise', countryWise)
router.get('/branch-wise', branchWise)
router.get('/source-wise', sourceWise)
router.get('/counsellor/assigned/', statusCountByCounsellor)
router.get('/counsellor-assigned/', counsellorAssigned)

module.exports = router