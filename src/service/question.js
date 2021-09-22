const { questionDB } = require('../db')

module.exports.createQuestion = (req, res) => new Promise(async (resolve, reject) => {
  const { text, weightage } = req.body

  const result = await questionDB.createQuestion(text, weightage)

  if (result._id) {
    return resolve(result)
  }

  reject(result)
})
