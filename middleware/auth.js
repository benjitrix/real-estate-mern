const jwt = require('jsonwebtoken')
const { createCustomError } = require('../errors/custom-error')

const authenticateUser = (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization
  console.log('AuthHeader: ', authHeader);

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(createCustomError('Token not provided or invalid', 401))
  }

  const token = authHeader.split(' ')[1]

  try {
    const payload = jwt.verify(token, `${process.env.JWT_SECRET}`)
    // attach user to ob routes
    req.user = { userId: payload.userId, name: payload.name, role: payload.role }
    console.log('Req user (estates): ', req.user);
    next()
  } catch (error) {
    return next(createCustomError('No authorization to access this route', 401))
  }
}

module.exports = authenticateUser