const { contactDB } = require('../db')
const { User } = require('../db/models')

module.exports.createContact = (req, res) => new Promise(async (resolve, reject) => {
    const { user_id } = req.body

    await contactDB.createContact(user_id)

    const nearbyUserRiskIndex = await User.getNearbyUserRiskIndex(user_id)

    let result = (nearbyUserRiskIndex > 3) ? true : false

    resolve({
        dangerous: result
    })
})
