const Estate = require('../models/Estate')
const User = require('../models/User')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')
const cloudinary = require('../middleware/cloudinary')
const fs = require('fs')

// get all estates
const getAllEstates = asyncWrapper(async (req, res, next) => {
  const estates = await Estate.find({})
  if (!estates) {
    next(createCustomError('Estates could not be retrieved', 404))
  }
  res.status(200).json({message: { 
    msgBody: 'All estates retrieved', 
    msgError: false, 
    estates
  }})
})

// create estate
const registerEstate = asyncWrapper(async (req, res, next) => {
  const { title, category, estateType, description, location, price, contact } = req.body
  console.log('Req.body: ', req.body)
  console.log('Req.user: ', req.user)

  for (property in req.body) {
    if (!`${req.body[property]}`) {
      next(createCustomError(`Please provide estate ${property}`, 404))
    }
  }

  const uploader = async (path) => await cloudinary.uploads(path, 'Images')
  const images = req.files
  console.log('Req.files: ', images)
  if (images.length < 1) {
      next(createCustomError('Please provide estate images', 404))
    }
  // check multer for MulterError handler) {
  const urls = []
  for (const image of images) {
    const imagePath = image.path
    const imageURL = await uploader(imagePath)
    urls.push(imageURL.url)
    fs.unlinkSync(imagePath)
  }
  
  const newEstate = new Estate({
    title: title,
    category: category,
    estateType: estateType,
    description: description,
    location: location,
    price: price,
    contact: contact,
    images: urls,
    createdBy: req.user.name
  })
  const estate = await Estate.create(newEstate)
  const user = await User.findOne({_id: req.user.userId})
  await user.estates.push(estate)
  user.save()

  res.status(201).json({message: { 
    msgBody: `Estate -${estate.title}- created`, 
    msgError: false, 
    image: {imageURLs: urls}, 
    isAuthenticated: true 
  }})
})

// get estate
const getEstate = asyncWrapper(async (req, res, next) => {
  const { id }  = req.params
  const estate = await Estate.findOne({_id: id})
  if (!estate) {
    next(createCustomError('Estate not found', 404))
  }
  res.status(200).json({message: { 
    msgBody: `Estate -${estate._id}- retrieved`, 
    msgError: false, 
    estate 
  }})
})

// get user estates
const getUserEstates = asyncWrapper(async (req, res, next) => {
  const _id = req.user.userId
  const estates = await User.findOne({_id}).populate(
    {
      path: 'estates',
      select: 'title category estateType location price description contact images createdAt updatedAt'
    }
  )
  if (!estates) {
    next(createCustomError('Estates not found', 404))
  }
  res.status(200).json({message: {
    msgBody: `${estates.length} user estates retrieved`, 
    msgError: false, 
    estates: estates.estates
  }})
})

// update estate
const updateEstate = asyncWrapper(async (req, res, next) => {
  const { id: estateID } = req.params

  const uploader = async (path) => await cloudinary.uploads(path, 'Images')
  const images = req.files
  console.log("Images: ", req.files)
  
  let estateObj = {}
  const updateEstate = req.body
  console.log('Updated Estate: ', updateEstate);
  for (const key in updateEstate) {
    estateObj[key] = updateEstate[key]   
  }

  if (images.length < 1 && estateObj.images !== []) {
    console.log('No images to update')
  } else {
    const urls = []
    for (const image of images) {
      const imagePath = image.path
      const imageURL = await uploader(imagePath)
      urls.push(imageURL.url)
      fs.unlinkSync(imagePath)
    }
    estateObj['images'] = urls
  }
  
  console.log('estateObj: ', estateObj)
  const estate = await Estate.findOneAndUpdate({_id: estateID}, estateObj, {new: true, runValidators: true})

  res.status(200).json({message: { 
    msgBody: `Estate -${estate.title}- updated`, 
    msgError: false, 
    isAuthenticated: true 
  }})
})

// delete estate
const deleteEstate = asyncWrapper(async (req, res, next) => {
  const { id } = req.params
  console.log('Delete id: ', id);
  const estateToDelete = await Estate.findOne({_id: id})
  const estate = await Estate.deleteOne({_id: id})
  
  // remove deleted estate references in user document
  const user = await User.findOne({_id: req.user.userId})
  const index = user.estates.indexOf(id)
  user.estates.splice(index, 1)
  user.save()

  if (!estateToDelete) {
    next(createCustomError('Estate not found', 404))
  }
  
  res.status(200).json({message: {
    msgBody: `Estate -${estateToDelete.title}- deleted`, 
    msgError: false, 
    isAuthenticated: true
  }})
})

module.exports = { getAllEstates, registerEstate, getEstate, getUserEstates, updateEstate, deleteEstate }