const jwt = require('jsonwebtoken')
const { accessTokenExpiryTime } = require('../constant')
const  { User, Token } = require('./models')

module.exports.login = (email, password) => new Promise(async (resolve, reject) => {
  try {
    const user = await User.findByCredentials(email, password)
    const { token, refreshToken } = await generateAuthToken(user._id)

    resolve({
      user,
      token,
      refreshToken
    })
  } catch (e) {
    resolve(e.message)
  }
})

const generateAuthToken = (userId) => new Promise(async (resolve, reject) => {
  const expirationTime = new Date().getTime() + accessTokenExpiryTime
  const token = jwt.sign({ _id: userId, exp: expirationTime }, process.env.JWT_SECRET)
  const refreshToken = jwt.sign({ _id: userId }, process.env.JWT_SECRET)

  const newToken = new Token({
    token,
    refreshToken,
    createdBy: userId
  })

  try {
    const token = await newToken.save()

    resolve(token)
  } catch (e) {
    resolve(e)
  }
})

module.exports.refreshAccessToken = (refreshToken) => new Promise(async (resolve, reject) => {
  const { _id } = jwt.verify(refreshToken, process.env.JWT_SECRET)
  const expirationTime = new Date().getTime() + accessTokenExpiryTime
  const newAccessToken = jwt.sign({ _id, exp: expirationTime }, process.env.JWT_SECRET)
  const tokenObject = await Token.findOneAndUpdate({ refreshToken }, { token: newAccessToken }, { new: true })

  if (tokenObject) {
    return resolve({
      token: newAccessToken
    })
  }

  resolve("Unauthorized")
})
