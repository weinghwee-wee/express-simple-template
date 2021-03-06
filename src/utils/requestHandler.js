const { authMiddleware } = require('../middlewares')

const requestHandler = (method, auth) => {
  const methodHandler = async (req, res, next) => {
    if (req.error) {
      return next()
    }

    try {
      const result = await method(req, res)
      req.result = result

      next()
    } catch (e) {
      if (e.statusCode) {
        req.error = {
          statusCode: e.statusCode,
          response: e.errorResponse
        }
      } else {
        req.error = {
          response: e
        }
      }
      next()
    }
  }

  return [
    authMiddleware(auth),
    methodHandler,
    createResponse
  ]
}

const createResponse = (req, res, next) => {
  const { error, result } = req

  if (result) {
    return res.send({
      status: 200,
      result
    })
  }

  const { statusCode, response } = error

  if (response.code == 11000) {
    const duplicatedField = Object.keys(response.keyValue)[0]
    const duplicatedValue = response.keyValue[duplicatedField]
    const errResponse = `User with the ${duplicatedField} of ${duplicatedValue} is already existed`
    res.status(400).send({
      status: 400,
      error: errResponse
    })
  } else {
    res.status(statusCode || 400).send({
      status: statusCode || 400,
      error: response
    })
  }
  
}

module.exports = requestHandler
