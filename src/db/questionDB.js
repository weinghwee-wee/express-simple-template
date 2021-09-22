const { Question } = require('./models')

module.exports.createQuestion = (text, weightage) => new Promise(async (resolve, reject) => {
  const newQuestion = new Question({
    text,
    weightage
  })

  try {
    const question = await newQuestion.save()

    resolve(question)
  } catch (e) {
    resolve(e)
  }
})

module.exports.retrieveQuestions = (query) => new Promise(async (resolve, reject) => {
  try {
    const questions = await Question.find(query)

    resolve(questions)
  } catch (e) {
    resolve([])
  }
})
