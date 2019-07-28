//nodemailer.js
const nodemailer = require('nodemailer');

//创建一个smtp服务器
const config = {
  host: 'smtp.qq.com',
  port: 465,
  auth: {
    user: '348821387@qq.com', //注册的163邮箱账号
    pass: 'udcyygxykfstbgcb' //邮箱的授权码，不是注册时的密码,等你开启的stmp服务自然就会知道了
  }
};
// 创建一个SMTP客户端对象
const transporter = nodemailer.createTransport(config);

//发送邮件
module.exports = async function (mail) {
  
  return await transporter.sendMail(mail)
}
