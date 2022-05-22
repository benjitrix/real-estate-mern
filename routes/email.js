const express = require('express')
const router = express.Router()
const sendEmail = require('../controllers/sendEmail')

// email route
router.get('/', sendEmail)

module.exports = router