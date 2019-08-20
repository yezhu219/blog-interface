const Router = require('koa-router')
const api = require('../controller/index')
const email = require('../controller/mail')
const multer = require('koa-multer')
//文件上传
//配置
var storage = multer.diskStorage({
  //文件保存路径
  destination: function (req, file, cb) {
    cb(null, 'public/img/')
  },
  //修改文件名称
  filename: function (req, file, cb) {
    var fileFormat = (file.originalname).split(".");  //以点分割成数组，数组的最后一项就是后缀名
    cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
  }
})
//加载配置
var upload = multer({ storage: storage });
//路由
// router.post('/upLoadImg', upload.single('img'), async (ctx, next) => {
//   ctx.body = {
//     code: 200,
//     data: {
//       url: ctx.req.file.filename,
//       msg: 'sucess',

//     }
//   }
// })


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
//图片上传
router.post('/upLoadImg', upload.single('img'), api.upLoadImg)
//编辑文章
router.post('/updateArticle', api.updateArticle)
exports.router =router