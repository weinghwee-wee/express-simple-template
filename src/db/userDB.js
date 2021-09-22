const { User } = require('./models')

module.exports.createUser = (name, password, phone, ic_no, salt) => new Promise(async (resolve, reject) => {
  const newUser = new User({
    name,
    password,
    phone,
    ic_no,
    salt
  })

  try {
    const user = await newUser.save()

    resolve(user)
  } catch (e) {
    resolve(e)
  }
})

module.exports.retrieveUsers = (query) => new Promise(async (resolve, reject) => {
  try {
    const users = await User.find(query)

    resolve(users)
  } catch (e) {
    resolve([])
  }
})
