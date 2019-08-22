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
      let { pageSize = 10, pageNumber = 1 } = ctx.request.query
      console.log(pageSize,pageNumber,'------------')
      // let req = ctx.request.query;
      // let pageNumber = req.pageNumber/1 || 1
      // let pageSize = req.pageSize/1 || 10
      let list = await articleListModel.find({}).skip((pageNumber-1)*(pageSize/1)).limit(pageSize/1).sort({ '_id': -1 })
      let frontCount = await articleListModel.count({});
      ctx.body = {
        code: 200,
        count: frontCount,
        list,
        pageSize,
        pageNumber
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
  },
  async updateArticle(ctx) {
    try {
      let { article } = ctx.request.body
      let res = await articleListModel.findOneAndUpdate({ _id: article._id }, article)
      console.log(res,'--------')
      if (res) {
        ctx.body = {
          code: 200,
          data: {
            msg:'success'
          }
        }
      } else {
        ctx.body = {
          code: 200,
          data: {
            msg: 'faile'
          }
        }
      }
    } catch (e) {
      ctx.body = { error: 1, data: { msg: e } }

    }

  },
  async search(ctx) {
    try {
      let  keyWrod  = ctx.request.query
      const reg = new RegExp(keyWrod, 'i') 
      let res = await articleListModel.find().or(
        [{ title: { $regex: reg } },
          { author: { $regex: reg } },
          { content: { $regex: reg } },
          { des: { $regex: reg } }
        ])
      ctx.body = {
        code: 200,
        data: {
          data: res
        }
      }
      
    } catch (e) {
      ctx.body = { error: 1, data: { msg: e } }
    }

  },
  async getClassify(ctx){
    let data = await tagModel.find({})
    ctx.body = {
      code: 200,
      data: {
        data
      }
    }
  },
  async addClassify(ctx) {
    let tag = ctx.request.body
    let msg = 'failed'
    let isNew = await tagModel.find({ name: tag.name })
    if (isNew.length == 0) {
      let res = await tagModel.create(tag)
      msg = 'success'
    }
    ctx.body = {
      code: 200,
      data: {
        data: msg
      }
    }
  },
  async delClassify(ctx) {
    let data = ctx.request.body
  },
}