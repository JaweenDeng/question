/*
 * @Author: djw
 * @Description: 问题相关
 */
const question_model = require('../models/question')
const bcrypt = require('../utils/bcrypt')
const answer_model = require('../models/answer')

//创建问题
const create = async (ctx, next) => {
  const req = ctx.request.body
  const token = bcrypt.getToken(ctx)
  if(!token) {
    ctx.body = {
      code: 1001,
      msg: '请先登录'
    }
    return
  }
  const query = await question_model.find().count()
  const createTime = parseInt(new Date().getTime()/1000)
  const newUser = await question_model.create({
    userId:token.userId,
    name: req.name,
    des:req.des ,
    id:query+1,
    createTime:createTime,
    poster:req.poster,
    userName:token.account
  });
  ctx.body = {
    code: 0,
    msg: '发布成功！'
  }
}

//获取所有问题
const getQuestion = async (ctx, next) => {
  const token = bcrypt.getToken(ctx)
  const newUser = await question_model.find({
    userId:token.userId,
  });
  if(newUser) {
    ctx.body = {
      code: 0,
      msg: 'success',
      data:newUser
    }
  }
}

//回答问题
const answerQuestion = async (ctx, next) => {
  const token = bcrypt.getToken(ctx)
  if(!token) {
    ctx.body = {
      code: 1001,
      msg: '请先登录'
    }
    return
  }
  const req = ctx.request.body
  const userId = token.userId
  const createTime = parseInt(new Date().getTime()/1000)
  const query = await answer_model.find().count()
  const newUser = await answer_model.create({
    userId:token.userId,
    questionId: req.id,
    content:req.content ,
    id:query+1,
    createTime:createTime,
    userName:token.account
  });
  if(newUser) {
    ctx.body = {
      code: 0,
      msg: 'success',
      data:newUser
    }
  }
}

//图片上传
const uploadImage = async (ctx, next) => {
  if(ctx.file.filename) {
    ctx.body = {
      code: 0,
      msg: 'success',
      data: `/images/${ctx.file.filename}`
    }
  } else {
    ctx.body = {
      code: 1,
      msg: '上传失败请稍后再试',
    }
  }
}

//问题删除
const deleteQuestion = async (ctx, next) => {
  const token = bcrypt.getToken(ctx)
  if(!token) {
    ctx.body = {
      code: 1001,
      msg: '请先登录'
    }
    return
  }
  const req = ctx.request.body
  const userId = token.userId
  const result = await question_model.deleteOne({id:req.id, userId})
  if(result) {
    ctx.body = {
      code: 0,
      msg: 'success',
    }
  } else {
    ctx.body = {
      code: 1,
      msg: 'error',
    }
  }
}

//问题详情
const getQuestionDetail = async (ctx, next) => {
  const query = ctx.query
  const id = query.id
  const token = bcrypt.getToken(ctx)
  if(!token) {
    ctx.body = {
      code: 1001,
      msg: '请先登录'
    }
    return
  }
  const req = ctx.request.body
  const userId = token.userId
  const data = await question_model.find({id:id, userId})
  if(data && data.length) {
    ctx.body = {
      code: 0,
      msg: 'success',
      data:data[0]
    }
  }
}

//修改问题
const updateQuestion = async (ctx, next) => {
  const req = ctx.request.body
  const token = bcrypt.getToken(ctx)
  if(!token) {
    ctx.body = {
      code: 1001,
      msg: '请先登录'
    }
    return
  }
  const createTime = parseInt(new Date().getTime()/1000)
  const newUser = await question_model.updateOne({id:req.id}, {
    userId:token.userId,
    name: req.name,
    des:req.des ,
    id:req.id,
    createTime:createTime,
    poster:req.poster,
    userName:token.account
  });
  ctx.body = {
    code: 0,
    msg: '编辑成功！'
  }
}


module.exports = {
  create,
  getQuestion,
  answerQuestion,
  uploadImage,
  deleteQuestion,
  getQuestionDetail,
  updateQuestion
}
