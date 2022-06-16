/*
 * @Author: djw
 * @Description:用户路由
 */
const Router = require('koa-router')
const router = new Router()
const userController = require('../app/controllers/user_controller')
router.get('/user/getUserList', userController.getUserList)
router.post('/user/register', userController.register)
router.post('/user/login', userController.login)
module.exports = router