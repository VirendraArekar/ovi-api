const express = require("express")
const { createCity, getCities, updateCity, deleteCity } = require("../controllers/city.controller")
const router = express.Router()

// routes
router.post('/create', createCity)
router.get('/all', getCities)
router.put('/update/:id', updateCity)
router.delete('/delete/:id', deleteCity)

module.exports = router