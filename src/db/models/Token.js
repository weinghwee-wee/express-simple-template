const mongoose = require('mongoose')
const { refreshTokenExpiryTime } = require('../../constant')

const tokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
}, {
  timestamps: true
})

tokenSchema.index({ "createdAt": 1 }, { expireAfterSeconds: refreshTokenExpiryTime })

const Token = mongoose.model('Token', tokenSchema)

module.exports = Token
