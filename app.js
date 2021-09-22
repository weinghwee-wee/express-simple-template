// require library to read environment variable from .env
require("dotenv").config();

// connect to db
const mongoose = require('./src/db/mongoose');

mongoose.connect();

const express = require("express")
const bodyParser = require("body-parser");
const cors = require("cors");
const { requestHandler } = require('./src/utils')

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const route = (requestMethod, routeName, method, noAuth) => {
  return app[requestMethod](routeName, requestHandler(method, noAuth))
}

const { user, auth, question, contact } = require('./src/service');

route('post', '/user/signup', user.registerUser, true)
route('post', '/user/login', auth.loginUser, true)

route('post', '/api/questions', question.createQuestion, true)
route('get', '/api/questions', question.getQuestions)
route('post', '/api/questions/submit', question.submitQuestions)

route('post', '/api/contact', contact.createContact)

// route('post', '/user/refresh', auth.refreshToken)
module.exports = app

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`)
})

