const { createCustomError } = require("../errors/custom-error");
const asyncWrapper = require("../middleware/async");
const Estate = require('../models/Estate');
const User = require("../models/User");

// add estate to cart
const addEstateToCart = asyncWrapper(async (req, res, next) => {
  const { id } = req.params
  const estate = await Estate.findOne({_id: id})
  const user = await User.findOne({_id: req.user.userId})
  if (!estate || !user) {
    next(createCustomError('Estate or user not found', 404))
  }

  await user.cart.push(id)
  await user.save()

  res.status(201).json({message: {
    msgBody: user.cart,
    msgError: false
  }})
})

// get estates from cart
const getEstatesInCart = asyncWrapper(async (req, res, next) => {
  const estatesInUserCart = await User.findOne({_id: req.user.userId}).populate(
    {
      path: 'cart',
      select: 'title category estateType location time description price contact images createdAt'
    }
  )
  if (!estatesInUserCart) {
    next(createCustomError('No estates in cart', 404))
  }

  res.status(201).json({message: {
    msgBody: `${(estatesInUserCart.cart).length} estates retrieved from cart`,
    msgError: false,
    cart: estatesInUserCart.cart
  }})
})

// remove estate from cart
const removeEstateFromCart = asyncWrapper(async (req, res, next) => {
  const { id } = req.params
  console.log('Remove: ', id);

  const user = await User.findOne({_id: req.user.userId})
  if (user.cart === []) {
    next(createCustomError('User cart empty', 404))
  }

  let estateIndex = 0
  await user.cart.forEach((item, index) => {
    if (item._id.valueOf() === id) {
      estateIndex = index
    }
  })

  const estate = await Estate.findOne({_id: id})
  const removeSuccess = await User.findOneAndUpdate(
    {_id: req.user.userId},
    { $pull: { cart: id} } 
  )
  await user.save()

  if (!removeSuccess) {
    next(createCustomError('Delete not successful', 404))
  }

  res.status(200).json({message: {
    msgBody: 'Estate removed from cart',
    msgError: false,
    estate: estate
  }})
})

module.exports = { addEstateToCart, getEstatesInCart, removeEstateFromCart }