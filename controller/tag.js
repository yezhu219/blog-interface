const tagModel = require('../schema/tag')

const mongoose = require('mongoose')

module.exports = {
  async getClassify(ctx) {
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
    let tag = ctx.request.body
    let msg = 'failed'
    let res = await tagModel.remove({ name: tag.name })
    if (res.deletedCount == 1) {
      msg = 'success'
    }
    ctx.body = {
      code: 200,
      data: {
        data: msg,
      }
    }
  },
  async editeClassify(ctx) {
    let tag = ctx.request.body
    let msg = 'failed'
    console.log(tag,999)
    let res = await tagModel.findOneAndUpdate({_id:tag._id},tag)
    if (res) {
      msg = 'success'
    }
    ctx.body = {
      code: 200,
      data: {
        data: msg
      }
    }
  },
}