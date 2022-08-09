/*
 * @Author: djw
 * @Description: 首页相关
 */
const question_model = require('../models/question')
const answer_model = require('../models/answer')

const index = async (ctx, next) => {
  const query = ctx.query
  const total = await question_model.count()
  const data = await question_model.find().skip(((query.page-1)*query.pageSize)).limit(query.pageSize)
  ctx.body = {
    code: 0,
    msg: 'success',
    data:data,
    total:total
  }
}

const detail = async (ctx, next) => {
  const query = ctx.query
  const id = query.id
  const data = await question_model.find({id:id})
  if(data && data.length) {
    ctx.body = {
      code: 0,
      msg: 'success',
      data:data[0]
    }
  }
}

//获取所有评论
const getAnswer = async (ctx, next) => {
  const query = ctx.query
  const id = query.id
  const page = query.page || 1
  const pageSize = query.pageSize || 10
  const total = await answer_model.count({questionId:id})
  const data = await answer_model.find({questionId:id}).skip(((page-1)*pageSize)).limit(pageSize)
  ctx.body = {
    code: 0,
    msg: 'success',
    data:data,
    total:total
  }
}

module.exports = {
  index,
  detail,
  getAnswer
}