const { contactDB } = require('../db')
const { User } = require('../db/models')

module.exports.createContact = (req, res) => new Promise(async (resolve, reject) => {
    const { user_id } = req.body

    const contact = await contactDB.createContact(user_id)

    const nearbyUserRiskIndex = await User.getNearbyUserRiskIndex(user_id)

    let result = (nearbyUserRiskIndex == 2) ? true : false

    resolve({
        dangerous: result,
        last_exposed_date: contact.createdAt
    })
})
