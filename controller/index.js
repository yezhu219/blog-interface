const articleListModel = require('../schema/articleList')
const articleDetialModel = require('../schema/articleDetail')
const userModel = require('../schema/user')
const mongoose = require('mongoose')
const jwt = require('../lib/jwt')

const md = require('markdown').markdown

module.exports = {
  async articleList(ctx) {
    try {
      let req = ctx.request.query;
      let list = await articleListModel.find({}).skip(1).limit(10).sort({ '_id': -1 })
      let frontCount = await articleListModel.count({});
      ctx.body = {
        error: 0,
        count: frontCount,
        list
      }
    } catch (e) {
      ctx.body = { error: 1, msg: e }
    }
  },
  async articleDetail(ctx) {
    try {
      let req = ctx.request.query
      let id = mongoose.Types.ObjectId(req.id)
      let data = await articleListModel.findOne({ "_id": id })
      data.content=md.toHTML(data.content)
      ctx.body = {
        code: 200,
        data
      }
    } catch (e) {
      ctx.body = { error: 1, data:{msg: e} }
    }
  },

  async login(ctx) {
    try {
      let reply = '用户名或密码错误'
      let code= 100
      let data = ctx.request.body
      let token = ''
      let res = await userModel.findOne({ userName: data.userName })
      if (res.password == data.password) {
        let id = res._id.toString()
        let jwtModel = new jwt(id)
        token= jwtModel.generateToken()
        code = 200
        reply = 'sucess'
      } 
      ctx.body = {
        code,
        data: {
          msg: reply,
          token
        }
      }
    } catch (e) {
      ctx.body = { error: 1, data: { msg: e } }
    }
  },
  async register(ctx) {
    try {
      let data = ctx.request.body
      userModel.create(data, function (err, doc) {
        if (err) console.log(err)
        console.log('保存成功')
      })
      
    } catch (e) {
      //handle error
      ctx.body = { error: 1, data: { msg: e } }
    }
  }
}