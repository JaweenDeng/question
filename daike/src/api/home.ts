/*
 * @Author: djw
 * @Description: 首页api
 */
import request from '@/utils/axios'
import { IPage } from '@/types/common'

//获取的所有问题
export const getHomeIndex = (params:IPage) => {
  return request({
    url: `/home/index`,
    method: 'get',
    params:{
      ...params
    }
  })
}

//获取问题详情
export const getQuestionDetail = (id:string) => {
  return request({
    url: `/home/detail`,
    method: 'get',
    params:{
      id
    }
  })
}