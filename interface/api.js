const Router = require('koa-router')
const api = require('../controller/index')


const router = new Router({
  prefix:'/v1'
})
// 文章列表
router.get('/articleList', api.articleList)
// 文章详情
router.get('/detail',api.articleDetail)
router.post('/test',api.test)

exports.router =router