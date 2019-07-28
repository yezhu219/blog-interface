const mongoose = require('mongoose')

const db = require('../db')

const authCodeSchema = new mongoose.Schema({
  email: String,
  authCode: String,
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  }

})

authCodeSchema.pre('save', function (next) {
  if (this.isNew) {
    this.createdAt = this.updatedAt = Date.now()
  } else {
    this.updatedAt = Date.now()
  }
  next()
})



let authCodeModel = db.model('authCode', authCodeSchema)

module.exports = authCodeModel

