const { questionDB } = require('../db')
const { riskCalculator } = require('../utils')
const { User } = require('../db/models')

module.exports.createQuestion = (req, res) => new Promise(async (resolve, reject) => {
  const { text, weightage } = req.body

  const result = await questionDB.createQuestion(text, weightage)

  if (result._id) {
    return resolve(result)
  }

  reject(result)
})

module.exports.getQuestions = (req, res) => new Promise(async (resolve, reject) => {
  const result = await questionDB.retrieveQuestions({})

  resolve(result)
})

module.exports.submitQuestions = (req, res) => new Promise(async (resolve, reject) => {
  let { questions, user_id } = req.body
  let questionIds = []

  // filter for only "YES" question
  questions = questions.filter(question => {
    return question.value == 1
  })

  questions.forEach(question => {
    questionIds.push(question.id)
  });

  const questionObjects = await questionDB.retrieveQuestions({ _id: { $in: questionIds }})
  const riskScore = riskCalculator.calculateRiskScore(questionObjects)
  const riskIndex = riskCalculator.getRiskIndexBasedonRiskScore(riskScore)

  const user = await User.findById(user_id)

  user.updateRiskIndex(riskIndex)

  resolve(true)
})
