const mongoose = require('mongoose')

const db = require('../db')

const tagSchema = new mongoose.Schema({
  name: String,
  color: String,
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  }
})

let tag = db.model('tag', tagSchema)

module.exports = tag