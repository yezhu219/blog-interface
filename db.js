const mongoose = require('mongoose')
const glob = require('glob')
const { resolve } = require('path')

//配置数据库地址
const dbUrl = 'mongodb://localhost/aa'
//配置数据库链接
const config = {
  useNewUrlParser: true,
}
//开启debug
mongoose.set('debug', true)
//设置mongoose 使用node的Promise
mongoose.Promise = global.Promise
//处理链接异常
const handleUnusual = (max) => {
  max++
  if (max <= 3) {
    mongoose.connect(db)
  } else {
    console.log('链接失败')
  }
}

//加载所有schema

  // glob.sync(resolve(__dirname, './schema/', '**/*.js')).forEach(require)

//链接数据库


  let max = 1
  mongoose.connect(dbUrl, config)
const db = mongoose.connection
  

  //链接失败处理
db.on('disconnected', () => {
    console.log('链接断开！！！！')
    handleUnusual(max)
  })
  //链接错误
  db.on('error', (err) => {
    console.log('链接断开！！！！')
    handleUnusual(max)
    throw new Error(err)

  })
  //链接成功
  db.once('open', () => {
    console.log('链接成功！！！！')
   
  })
 
  module.exports = db