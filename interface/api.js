const Router = require('koa-router')
const api = require('../controller/index')
const email = require('../controller/mail')


const router = new Router({
  prefix:'/v1'
})
// 文章列表
router.get('/articleList', api.articleList)
// 文章详情
router.get('/detail',api.articleDetail)
// 登录
router.post('/login',api.login)
// 注册
router.post('/register', api.register)
//验证用户名 
router.post('/checkUserName', api.checkUserName)
//发送验证码
router.post('/authCode', email.authCode)
//验证验证码
router.post('/checkAuthCode', email.checkAuthCode)
exports.router =router