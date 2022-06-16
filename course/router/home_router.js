/*
 * @Author: djw
 * @Description: 首页路由
 */
const Router = require('koa-router') 
const router = new Router()
const homeController = require('../app/controllers/home_controller')
router.get('/home/index', homeController.index)
router.get('/home/detail', homeController.detail)
router.get('/home/getAnswer', homeController.getAnswer)
module.exports = router