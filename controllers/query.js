const asyncWrapper = require("../middleware/async");
const Category = require('../models/Category.model')
const { createCustomError } = require('../errors/custom-error')
const Estate = require('../models/Estate')

// GET categories
const getCategories = asyncWrapper(async (req, res, next) => {
  const categories = await Category.find({})
  if (!categories) {
    next(createCustomError('Categories not retrieved', 400))
  }
  res.status(200).json({message: {
    msgBody: categories,
    msgError: false,
    categories
  }})
})

// GET estate types
const getEstateTypes = asyncWrapper(async (req, res, next) => {
  const { category } = req.body
  const estateTypes = await Category.findOne({name: category})
  if (!category) {
    next(createCustomError('Category not found', 400))
  }
  res.status(200).json({message: {
    msgBody: estateTypes.estateType,
    msgError: false,
    estateTypes
  }})
})

// query search
const getQuery = asyncWrapper(async (req, res, next) => {
  console.log(req.body);
  const queryResult = await Estate.find(req.body)
  if (!queryResult) {
    next(createCustomError('Query search not successful', 400))
  }
  res.status(200).json({message: {
    queryResult
  }})
})

const getCategoryQuery = asyncWrapper(async (req, res, next) => {

})

const getEstateTypeQuery = asyncWrapper(async (req, res, next) => {

})

module.exports = { getCategories, getEstateTypes, getQuery, getCategoryQuery, getEstateTypeQuery }