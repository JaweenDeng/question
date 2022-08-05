/*
 * @Author: djw
 * @Description: 项目主入口
 */
const Koa = require('koa')
const mongoose = require('mongoose')
const config = require('./config')
const path = require('path')

const cors = require('koa2-cors')
const bodyParser = require('koa-bodyparser')
const koaJwt = require('koa-jwt')
const jwt = require('jsonwebtoken')
// koa-static中间件，用于访问静态文件
const static = require('koa-static')
const user_router = require('./router/user_router')
const question_router = require('./router/question_router')
const home_router = require('./router/home_router')
const app = new Koa()

//创建数据库链接
mongoose.connect(config.db, { useNewUrlParser: true }, (err) => {
  if (err) {
    console.error('Failed to connect to database');
  } else {
    console.log('Connecting database successfully');
  }
})

// 使用中间件，利用path模块的方法拼接出静态文件目录的绝对路径
app.use(static(path.join(__dirname,'./static')))

//处理跨域问题
app.use(cors())


//处理post请求参数
app.use(bodyParser())

//token鉴权start
app.use(function(ctx, next){
  return next().catch((err) => {
      if (401 == err.status) {
          ctx.status = 401;
          ctx.body = 'Protected resource, use Authorization header to get access\n';
      } else {
          throw err;
      }
  });
});

//路由权限控制 除了path里的路径不需要验证token 其他都要
app.use(
  koaJwt({
    secret: config.secret,
  }).unless({
    path:[/^\/user/, /^\/home/]
  })
)

app.use((ctx, next) => {
  if (ctx.header && ctx.header.authorization) {
    const parts = ctx.header.authorization.split(' ');
    if (parts.length === 2) {
      //取出token
      const scheme = parts[0];
      const token = parts[1];
      if (/^Bearer$/i.test(scheme)) {
        try {
          //jwt.verify方法验证token是否有效
          jwt.verify(token, secret.sign, {
            complete: true
          });
        } catch (error) {
          //token过期 生成新的token
          const user = jwt.decode(token)
          if(user) {
            const newToken = jwt.sign({ account: user.account, userId: user.userId }, config.secret, { expiresIn: '1h' })
            // //将新token放入Authorization中返回给前端
            ctx.res.setHeader('Authorization', newToken);
          }
        }
      }
    }
  }
  return next().catch(err => {
    if (err.status === 401) {
      ctx.status = 401;
      ctx.body =
        'Protected resource, use Authorization header to get access\n';
    } else {
      throw err;
    }
  });
});
//token鉴权end

//注册路由
app.use(user_router.routes()).use(user_router.allowedMethods())
app.use(question_router.routes()).use(question_router.allowedMethods())
app.use(home_router.routes()).use(home_router.allowedMethods())

app.listen(config.port);
