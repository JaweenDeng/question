/*
 * @Author: djw
 * @Description: 问题相关
 */
import request from '@/utils/axios'
import { IQuestion, IAnswer, IAnswerList } from '@/types/question'

//发布问题
export const create = (data:IQuestion) => {
  return request({
    url: `/question/create`,
    method: 'post',
    data
  })
}

//获取自己发布的所有问题
export const getAllQuestion = () => {
  return request({
    url: `/question/getQuestion?page=1`,
    method: 'get',
  })
}

//回答问题
export const ansQuestion = (data:IAnswer) => {
  return request({
    url: `/question/answer`,
    method: 'post',
    data
  })
}

//获取评论
export const getAnswer = (params:IAnswerList) => {
  return request({
    url:`/home/getAnswer`,
    method: 'get',
    params
  })
}
