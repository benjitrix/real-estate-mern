const express = require('express')
const router = express.Router()
const stripeAPI = require('../controllers/stripe')

// stripe routes
router.post('/create-payment-intent', stripeAPI)

module.exports = router
