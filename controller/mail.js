const mongoose = require('mongoose')
const authCodeModel = require('../schema/authCode')
const  nodemail  = require('../lib/stamp')

const createSixNum=()=>{
  var Num = "";
  for (var i = 0; i < 6; i++) {
    Num += Math.floor(Math.random() * 10);
  }
  return Num;
}
module.exports = {
  async authCode(ctx) {
    try {
      let { email } = ctx.request.body//刚刚从前台传过来的邮箱
      let code = await createSixNum();//这里是我写的生成的随机六位数，等等下面给代码
      authCodeModel.create({ email: email, authCode: code }, function (err, doc) {
        if (err) console.log(err)
        console.log('创建authCode成功')
      })
      let mail = {
        // 发件人
        from: '348821387@qq.com',
        // 主题
        subject: '邮箱验证码',//邮箱主题
        // 收件人
        to: email,//前台传过来的邮箱
        // 邮件内容，HTML格式
        text: `您的验证码是  ${code}`//发送验证码
      }
      let res = await nodemail(mail)
      if (res) {
        ctx.body = {
          code: 200,
          data: {
            msg: 'sucess',
            email,
            authCode: code
          }
        }
      } else {
        ctx.body = {
          code: 200,
          data: null
        }
      }
    } catch (e) {
      ctx.body = { error: 1, data: { msg: e } }
    }
  },
  
  async checkAuthCode() {
    
  }
}