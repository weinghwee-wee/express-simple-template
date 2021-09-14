const mongoose = require('mongoose')

module.exports.connect = () => {
  mongoose
    .connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    .then(() => {
      console.log('Connected to database')
    })
}

module.exports.disconnect = () => {
  return mongoose.disconnect();
}
