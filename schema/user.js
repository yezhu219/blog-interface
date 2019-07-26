const mongoose = require('mongoose')

const db = require('../db')

const userSchema = new mongoose.Schema({
  userName: String,
  password: String,
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  }

})

userSchema.pre('save', function (next) {
  if (this.isNew) {
    this.createdAt = this.updatedAt = Date.now()
  } else {
    this.updatedAt = Date.now()
  }
  next()
})

// userSchema.statics = {
//   async getPassword(pwd) {
//     const pwd = await this.findOne({ password: pwd })
//     if (pwd) {
      
//     }
//   }
// }
let usertModel = db.model('user', userSchema)

module.exports = usertModel

