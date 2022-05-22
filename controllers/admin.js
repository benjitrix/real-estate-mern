const { createCustomError } = require("../errors/custom-error");
const asyncWrapper = require("../middleware/async");
const Category = require('../models/Category.model')
const EstateType = require('../models/EstateType.model')

// add category
const addCategory = asyncWrapper(async (req, res, next) => {
  const { name }  = req.body
  console.log('Estate-type: ', name);
  const newCategory = new Category({
    name: name
  })
  const createdCategory = await Category.create(newCategory)
  res.status(201).json({message: {
    msgBody: `New category -${createdCategory.name}- created`,
    msgError: false,
    createdCategory
  }})
})

// add estate type
const addEstateType = (asyncWrapper(async (req, res, next) => {
  const { name, estateType } = req.body

  const category = await Category.findOne({name})
  if (!category) {
    next(createCustomError('Category not found', 400))
  }
  category.estateType.push({name: estateType})
  await category.save()

  res.status(200).json({message: {
    msgBody: `Estate type -${estateType}- added`,
    msgError: false
}})

}))

// get estate types
const getEstateTypes = asyncWrapper(async (req, res, next) => {
  const { name } = req.body
  const newEstateType = new EstateType({
    name: name
  })
  const createdEstateType = await EstateType.create(newEstateType)
  res.status(201).json({message: {
    msgBody: `New estate type -${createdEstateType.name}- created`,
    msgError: false,
    createdEstateType
  }})
})

module.exports = { addCategory, addEstateType, getEstateTypes }