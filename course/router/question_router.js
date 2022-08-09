/*
 * @Author: djw
 * @Description: 问题路由
 */
const Router = require('koa-router')
const router = new Router()
const questionController = require('../app/controllers/question_controller')
const loader = require('../app/utils/loader')


//加载配置
router.post('/question/create', questionController.create)
router.get('/question/getQuestion', questionController.getQuestion)
router.post('/question/answer', questionController.answerQuestion)
router.post('/question/uploadImage', loader.upload.single('file'), questionController.uploadImage)
router.post('/question/deleteQuestion', questionController.deleteQuestion)
router.get('/question/getQuestionDetail', questionController.getQuestionDetail)
router.post('/question/updateQuestion', questionController.updateQuestion)
module.exports = router
 