const express = require('express')
const { addEstateToCart, getEstatesInCart, removeEstateFromCart } = require('../controllers/purchase')

const router = express.Router()

// purchase routes
router.get('/add-to-cart/:id', addEstateToCart)
router.get('/estates-in-cart', getEstatesInCart)
router.get('/remove-from-cart/:id', removeEstateFromCart)

module.exports = router