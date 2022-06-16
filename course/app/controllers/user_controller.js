/*
 * @Author: djw
 * @Description: 用户相关
 */
const user_model = require('../models/user')
const uuid = require('uuid');
const bcrypt = require('../utils/bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../../config')
//获取全部用户列表
const getUserList = async (ctx, next) => {
  const user = await user_model.find()
  ctx.status = 200
  if(user) {
    ctx.body = {
      code:0,
      data:user
    }
  } else {
    ctx.body = {
      code:1,
      msg:'err'
    }
  }
}

//登录
const login = async (ctx, next) => {
  const req = ctx.request.body
  if(!req.account || !req.password) {
    ctx.body = {
      code: 1,
      msg: '参数缺失!'
    }
    return
  }
  const user = await user_model.findOne({
    account: req.account
  })
  if (!user) {
    ctx.body = {
      code: 1,
      msg: '该用户没有注册'
    }
    return
  }
  const match = await bcrypt.validate(req.password, user.password)
  if(!match) {
    ctx.body = {
      code: 1,
      msg: '密码不准确'
    }
    return
  }
  const token = jwt.sign({account:user.account, userId:user.userId}, config.secret, { expiresIn:  '1h' })
  ctx.body = {
    code: 0,
    msg: '登录成功!',
    data:token
  }
}

//注册
const register = async (ctx, next) => {
  const req = ctx.request.body
  if(!req.account || !req.password) {
    ctx.body = {
      code: 1,
      msg: '参数缺失!'
    }
    return
  }
  const user = await user_model.findOne({
    account: req.account
  })
  ctx.status = 200
  if (user) {
    ctx.body = {
      code: 1,
      msg: '用户名重复！'
    }
    return
  } 
  //插入新用户
  const userId = uuid.v1()
  const password = await bcrypt.encrtpt(req.password, 1)
  const newUser = await user_model.create({
    userId,
    account: req.account,
    password:password //这里要加密
  });
  if (newUser) {
    ctx.body = {
      code: 0,
      msg: '注册成功！'
    }
  } else {
    ctx.body = {
      code: 1,
      msg: '注册失败！'
    }
  }
}

module.exports = {
  getUserList,
  register,
  login
}
