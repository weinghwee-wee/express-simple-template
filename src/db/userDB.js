const { User } = require('./models')

module.exports.createUser = (email, password, salt) => new Promise(async (resolve, reject) => {
  const newUser = new User({
    email,
    password,
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
