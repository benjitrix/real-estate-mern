const User = require('../models/User')
const { createCustomError } = require('../errors/custom-error')

// create user
const register = async (req, res) => {
  const person = req.body
  try {
    const user = await User.create(person)
    res.status(200).json({message: { msgBody: `user -${user.name}- created`, msgError: false }})
  } catch (error) {
    res.status(500).json({message: { msgBody: error.message, msgError: true }})
  }
}

// login
const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return next(createCustomError('Please provide email and password', 404))
    }
    // check for user in DB
    const user = await User.findOne({email})
    if (!user) {
      return next(createCustomError(`No user with email: ${email}`, 404))
    }
    // compare password
    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
      return next(createCustomError('Password is incorrect', 404))
    }

    const token = user.createJWT()
    res.status(200).json({message: {msgBody: `user -${user.name}- logged in`, msgError: false, user: user.name, isAuthenticated: true, role: user.role, token}})
  } catch (error) {
    next(error)
  }
}

const logout = async (req, res, next) => {

}

// authorize user session
const authenticate = async (req, res, next) => {
  const { userId, name, role } = req.user
  console.log(req.user)
  // const user = await User.findOne({_id: userId})
  console.log('User ID: ', userId);
  try {
  // if (!user) {
  //   next(createCustomError('Authentication not valid', 401))
  // }
    res.status(200).json({message: {msgBody: { name, role }, msgError: false, isAuthenticated: true,}})
  } catch (error) {
    next(error)
  }
}

// get user
const getUser = async (req, res, next) => {
  const { id: userId } = req.params
  try {
    const user = await User.findOne({_id: userId})
    if(!user) {
      return next(createCustomError(`No user with id: ${userId}`, 404))
    }
    res.status(200).json({msg: user.email})
  } catch (error) {
    next(error)
  }
}

module.exports = { register, login, logout, authenticate, getUser }