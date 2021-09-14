const jwt = require('jsonwebtoken')
const User = require('../db/models/User')
const Token = require('../db/models/Token')

const auth = (noAuth) => {
  if (noAuth || process.env.AUTHENTICATION === 'OFF') {
    return (req, res, next) => {
      next()
    }
  }

  return async (req, res, next) => {
    if (req.error) {
      return next()
    }
  
    try {
      const token = req.header('Authorization').replace('Bearer ', '')
      const { _id, exp } = jwt.verify(token, process.env.JWT_SECRET)
      const user = await User.findOne({ _id })
      const authorized = await Token.findOne({ token })
  
  
      if (!authorized || checkTokenExpiry(exp)) {
        req.error = {
          statusCode: 401,
          response: 'Unauthorized'
        }
  
        next()
      }
  
      req.token = token
      req.user = user
      next()
    } catch (e) {
      req.error = {
        statusCode: 401,
        response: 'Unauthorized'
      }
  
      next()
    }
  }
}

const checkTokenExpiry = (exp) => {
  if (new Date().getTime() >= exp) {
    return true
  }

  return false
}

module.exports = auth
