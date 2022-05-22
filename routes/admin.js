const express = require('express')
const router = express.Router()
const { addCategory, addEstateType, getEstateTypes } = require('../controllers/admin')

// admin routes
router.post('/category', addCategory)
router.post('/estate-type', addEstateType)
router.get('/estate-types', getEstateTypes)

module.exports = router