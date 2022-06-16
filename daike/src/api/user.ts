import request from '@/utils/axios'
import { ILogin } from '@/types/user'
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

