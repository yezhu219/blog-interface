const mongoose = require('mongoose')

const db = require('../db')

const articleDetailSchema = new mongoose.Schema({
  title: String,
  from: String,
  fromgImg: String,
  date: String,
  time: String,
  content: String
})

let articleDetail = db.model('articleDetail', articleDetailSchema)

module.exports = articleDetail
