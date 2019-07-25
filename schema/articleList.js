const mongoose = require('mongoose')

const db = require('../db')
let ObjectId =  mongoose.Schema.Types.ObjectId 

const sfHotDaySchema = new mongoose.Schema({
  title: String,
  date: {
    type: Date,
    default: Date.now()
  },
  aId:ObjectId,
  desImg: String,
  authorImg: String,
  author: String,
  content: String,
  like: {
    type: Number,
    default: 0
  },
  view: {
    type: Number,
    default: 0
  }
})

let articleListModel = db.model('sfHotDay', sfHotDaySchema)

module.exports = articleListModel

