const express = require('express')
const router = express.Router()
const { getCategories, getEstateTypes, getQuery, getEstateTypeQuery, getCategoryQuery} = require('../controllers/query')

// query routes
router.get('/categories', getCategories)
router.post('/estate-types', getEstateTypes)
router.post('/query/all', getQuery)
router.post('/category-query', getCategoryQuery)
router.post('/estate-type-query', getEstateTypeQuery)

module.exports = router