const { Contact } = require('./models')

module.exports.createContact = (user_id) => new Promise(async (resolve, reject) => {
  const newContact = new Contact({
    user_id
  })

  try {
    const contact = await newContact.save()

    resolve(contact)
  } catch (e) {
    resolve(e)
  }
})
