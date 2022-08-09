import request from '@/utils/axios'
import { ILogin, IAvator } from '@/types/user'
import { IPage } from '@/types/common'

//获取全部用户列表
export const getUserList = () => {
  return request({
    url: `/user/getUserList`,
    method: 'get'
  })
}

//注册
export const register = (data:ILogin) => {
  return request({
    url:`/user/register`,
    method:'post',
    data
  })
}

//注册
export const login = (data:ILogin) => {
  return request({
    url:`/user/login`,
    method:'post',
    data
  })
}

//获取用户数据
export const getUserInfo = () => {
  return request({
    url:`/user/getUserInfo`,
    method:'get',
  })
}

//更新头像
export const updateAvator = (data:IAvator) => {
  return request({
    url:`/user/updateAvator`,
    method:'post',
    data
  })
}

//获取我的问题
export const getMyQuestion = (params:IPage) => {
  return request({
    url: `/user/getMyQuestion`,
    method: 'get',
    params:{
      ...params
    }
  })
}


