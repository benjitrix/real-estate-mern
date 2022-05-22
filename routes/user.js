const express = require('express')
const router = express.Router()
const { register, login, logout, authenticate, getUser } = require('../controllers/user')
const authenticateUser = require('../middleware/auth')

// user routes
router.get('/:id', getUser)
router.post('/register', register)
router.post('/login', login)
router.get('/check/authenticate', authenticateUser, authenticate)
router.get('/logout', authenticateUser, logout)

module.exports = router