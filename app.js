const Koa = require('koa')
const cors = require('koa2-cors')
const bodyparser = require('koa-bodyparser')
const { router } = require('./interface/api')

const app = new Koa()

app.use(cors())
app.use(bodyparser())
app.use(router.routes()).use(router.allowedMethods())


app.listen(3000, () => {
  console.log('running')
})