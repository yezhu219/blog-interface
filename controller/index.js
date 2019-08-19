const articleListModel = require('../schema/articleList')
const articleDetialModel = require('../schema/articleDetail')
const userModel = require('../schema/user')
const mongoose = require('mongoose')
const jwt = require('../lib/jwt')
const md5 = require('md5')
const fs = require('fs')

const md = require('markdown').markdown

module.exports = {
  async articleList(ctx) {
    try {
      let req = ctx.request.query;
      let list = await articleListModel.find({}).skip(1).limit(10).sort({ '_id': -1 })
      console.log(list,222)
      let frontCount = await articleListModel.count({});
      ctx.body = {
        code: 200,
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
      // let id = mongoose.Types.ObjectId(req.id)
      let id = req._id
      console.log(id,1)
      let data = await articleListModel.findOne({ "_id": id })
      console.log(data,2)
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
        token = jwtModel.generateToken()
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
      console.log(e)
      ctx.body = { error: 1, data: { msg: '登录失败' } }
    }
  },
  async register(ctx) {
    try {
      let data = ctx.request.body
      userModel.create({userName:data.uName,password:data.pwd}, function (err, doc) {
        if (err) console.log(err)
        console.log('保存成功')
      })
      ctx.body = {
        code: 200,
        data: {
          msg: 'sucess',
          
        }
      }
    } catch (e) {
      ctx.body = { error: 1, data: { msg: e } }
    }
  },
  //检查用户名是否被注册
  async checkUserName(ctx) {
    try {
      let { userName } = ctx.request.body
      let res = await userModel.findOne({userName})
      if (res) {
        ctx.body = {
          code: 200,
          data: null
        }
      } else {
        ctx.body = {
          code: 200,
          data: {
            msg:'sucess'
          }
        }
      }
      
    } catch (e) {
      ctx.body = { error: 1, data: { msg: e } }
      
    }

  },
  //图片上传
  async upLoadImg(ctx) {
  
    ctx.body = {
      code: 200,
      data: {
        url:'http://127.0.0.1:3001/img/'+ ctx.req.file.filename,
        msg: 'sucess',

      }
    }
  } 
}