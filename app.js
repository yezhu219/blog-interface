const Koa = require('koa')
const path = require('path')
const cors = require('koa2-cors')
const bodyparser = require('koa-bodyparser')
const { router } = require('./interface/api')

const staticFiles  = require('koa-static')
const app = new Koa()

app.use(cors())
app.use(bodyparser({
  formLimit:'5mb' //默认56kb,表单数据大时会报413
}))
app.use(staticFiles(path.join(__dirname, './public')))

  
  app.use(router.routes()).use(router.allowedMethods())



app.listen(3001, () => {
  console.log('running')
})