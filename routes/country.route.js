const express = require("express")
const router = express.Router()


// controllers
const { createCountry, isActiveToggle, getCountries, updateCountry, deleteCountry, getCountriesById } = require('../controllers/country.controller')


// routes
router.post('/create', createCountry)
router.put('/isactivetoggle/:id', isActiveToggle)
router.get('/all', getCountries)
router.get('/getcountry/:id', getCountriesById)
router.put('/update/:id', updateCountry)
router.delete('/delete/:id', deleteCountry)

module.exports = router