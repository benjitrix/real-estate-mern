const express = require('express')
const router = express.Router()
const upload = require('../middleware/multer')
const { registerEstate, getEstate, getUserEstates, updateEstate, deleteEstate } = require('../controllers/estate')

// estate routes
// router.get('/all', getAllEstates)
router.post('/register', upload.array('images', 12), registerEstate)
router.get('/:id', getEstate)
router.get('/estates/user', getUserEstates)
router.put('/update/:id', upload.array('images', 12), updateEstate)
router.delete('/delete/:id', deleteEstate)

module.exports = router