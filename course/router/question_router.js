/*
 * @Author: djw
 * @Description: 问题路由
 */
const Router = require('koa-router')
const router = new Router()
const questionController = require('../app/controllers/question_controller')
router.post('/question/create', questionController.create)
router.get('/question/getQuestion', questionController.getQuestion)
router.post('/question/answer', questionController.answerQuestion)
module.exports = router
 