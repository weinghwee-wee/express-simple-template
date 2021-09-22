const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
}, {
  timestamps: true
})

const Contact = mongoose.model('Contact', contactSchema)

module.exports = Contact
