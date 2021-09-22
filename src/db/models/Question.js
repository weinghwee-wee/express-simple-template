const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  weightage: {
    type: Number,
    required: true
  },
}, {
  timestamps: true
})

const Question = mongoose.model('Question', questionSchema)

module.exports = Question
