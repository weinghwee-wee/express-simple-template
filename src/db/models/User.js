const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  ic_no: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    require: true,
  },
  riskIndex: {
    type: Number,
    default: 1,
  }
}, {
  timestamps: true
})

// hash user password before saving to db
userSchema.pre('save', async function (next) {
  const user = this

  // only hash when user password is modified during save
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password + user.salt, 8)
  }

  next()
});

// search for uer object with the email and compare password
userSchema.statics.findByCredentials = async (phone, password) => {
  const user = await User.findOne({ phone })

  if (!user) {
    throw new Error("Invalid phone or password!")
  }

  const isMatch = await bcrypt.compare(password + user.salt, user.password)

  if (!isMatch) {
    throw new Error("Invalid phone or password!")
  }

  return user
};

userSchema.statics.getNearbyUserRiskIndex = async (user_id) => {
  const nearbyUser = await User.findById(user_id)

  if (nearbyUser) {
    return nearbyUser.riskIndex
  }

  return 1
};

// invoke automatically before sending response
// remove sensitive data like password and tokens
userSchema.methods.toJSON = function () {
  const user = this
  const userObject = user.toObject()

  delete userObject.password
  delete userObject.salt

  return userObject
};

userSchema.methods.updateRiskIndex = function (riskIndex) {
  const user = this
  user.riskIndex = riskIndex

  user.save()
};


const User = mongoose.model('User', userSchema)

module.exports = User
