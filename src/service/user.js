const { userDB } = require('../db')
const { authDB } = require('../db')
const bcrypt = require('bcryptjs')

module.exports.registerUser = (req, res) => new Promise(async (resolve, reject) => {
  const { name, password, phone, ic_no } = req.body

  const salt = await bcrypt.genSalt(10)

  const userDetails = await userDB.createUser(name, password, phone, ic_no, salt)

  if (userDetails._id) {
    console.log(`New user registered - "${phone}"`)

    const result = await authDB.login(phone, password) 

    return resolve(result)
  }

  reject(userDetails)
})
