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

// module.exports.retrieveUsers = (query) => new Promise(async (resolve, reject) => {
//   try {
//     const users = await User.find(query)

//     resolve(users)
//   } catch (e) {
//     resolve([])
//   }
// })
