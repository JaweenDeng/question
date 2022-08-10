/*
 * @Author: djw
 * @Description: 首页路由
 */
const Router = require('koa-router') 
const router = new Router()
const homeController = require('../app/controllers/home_controller')

/**
 * @swagger
 * /home/index:
 *   get:
 *     summary: 获取首页数据
 *     description: 获取首页数据
 *     tags:
 *       - home
 *     parameters:
 *       - name: page
 *         in: query
 *         required: true
 *         description: 当前页码
 *         type: string
 *       - name: pageSize
 *         in: query
 *         required: false
 *         description: 当前页数
 *         type: string
 *     responses:
 *       200:
 *         description: 成功获取
 */
router.get('/home/index', homeController.index)

/**
 * @swagger
 * /home/detail:
 *   get:
 *     summary: 获取问题详情
 *     description: 获取问题详情
 *     tags:
 *       - home
 *     parameters:
 *       - name: id
 *         in: query
 *         required: true
 *         description: 
 *         type: string
 *     responses:
 *       200:
 *         description: 成功获取
 */
router.get('/home/detail', homeController.detail)

/**
 * @swagger
 * /home/getAnswer:
 *   get:
 *     summary: 获取问题回答
 *     description: 获取问题回答
 *     tags:
 *       - home
 *     parameters:
 *       - name: page
 *         in: query
 *         required: true
 *         description: 当前页码
 *         type: string
 *       - name: pageSize
 *         in: query
 *         required: false
 *         description: 当前页数
 *         type: string
 *       - name: id
 *         in: query
 *         required: true
 *         description: 问题id
 *         type: string
 *     responses:
 *       200:
 *         description: 成功获取
 */
router.get('/home/getAnswer', homeController.getAnswer)
module.exports = router