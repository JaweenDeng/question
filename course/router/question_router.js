/*
 * @Author: djw
 * @Description: 问题路由
 */
const Router = require('koa-router')
const router = new Router()
const questionController = require('../app/controllers/question_controller')
const loader = require('../app/utils/loader')


/**
 * @swagger
 * /system_manager/add:
 *    post:
 *      tags:
 *      - system_manager
 *      summary: 新增管理员信息
 *      consumes:
 *        - application/json
 *      parameters:
 *      - name: system_manager
 *        in: body
 *        description: 新增管理员信息
 *        schema:
 *          type: object
 *          required:
 *            - name
 *          properties:
  *                name:
 *                  type: string
 *                  description: 问题名称  
 *                des:
 *                  type: string
 *                  description: 问题描述
 *                poster:
 *                  type: string
 *                  description: 问题图片    
 *      responses:
 *        200:
 *          description: successful operation
 * */
router.post('/question/create', questionController.create)
router.get('/question/getQuestion', questionController.getQuestion)
router.post('/question/answer', questionController.answerQuestion)
router.post('/question/uploadImage', loader.upload.single('file'), questionController.uploadImage)
router.post('/question/deleteQuestion', questionController.deleteQuestion)
router.get('/question/getQuestionDetail', questionController.getQuestionDetail)
router.post('/question/updateQuestion', questionController.updateQuestion)
module.exports = router
 