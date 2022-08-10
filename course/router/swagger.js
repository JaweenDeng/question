/*
 * @Author: djw
 * @Description: swagger相关配置
 * @path: http://localhost:3001/swagger
 */
const router = require('koa-router')() //引入路由函数
const swaggerJSDoc = require('swagger-jsdoc')
const path = require('path')
const swaggerDefinition = {
  info: {
    title: 'API',
    version: '1.0.0',
    description: 'API',
  },
  host: 'localhost:3001',
  basePath: '/', // Base path (optional)
  securityDefinitions:{
    token:{
      type: 'apiKey',
      name: 'token',
      in: 'header'
    }
  }
};

const options = {
  swaggerDefinition,
  apis: [
    path.join(__dirname, "./home_router.js"),
    path.join(__dirname, "./question_router.js")
  ], // 写有注解的router的存放地址
};

const swaggerSpec = swaggerJSDoc(options)

// 通过路由获取生成的注解文件
router.get('/swagger.json', async function (ctx) {
  ctx.set('Content-Type', 'application/json');
  ctx.body = swaggerSpec;
})

module.exports = router
//将页面暴露出去
