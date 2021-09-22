const { authDB } = require('../db')

module.exports.loginUser = (req, res) => new Promise(async (resolve, reject) => {
  const { phone, password } = req.body

  const result = await authDB.login(phone, password) 
  
  if (result.user) {
    return resolve(result)
  }
  
  reject(result)
})

module.exports.refreshToken = (req, res) => new Promise(async (resolve, reject) => {
  try {
    const refreshToken = req.header('Authorization').replace('Bearer ', '')
    const result = await authDB.refreshAccessToken(refreshToken)
    
    if (result.token) {
      return resolve(result)
    }

    reject({
      statusCode: 401,
      errorResponse: 'Unauthorized'
    })
  } catch (e) {
    reject({
      statusCode: 401,
      errorResponse: 'Unauthorized'
    })
  }
})
