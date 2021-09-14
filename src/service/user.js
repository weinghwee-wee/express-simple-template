const { userDB } = require('../db')
const bcrypt = require('bcryptjs')

module.exports.registerUser = (req, res) => new Promise(async (resolve, reject) => {
  const { email, password } = req.body

  const salt = await bcrypt.genSalt(10)

  const result = await userDB.createUser(email, password, salt)

  if (result._id) {
    console.log(`New user registered - "${email}"`)

    return resolve(result)
  }

  reject(result)
})
