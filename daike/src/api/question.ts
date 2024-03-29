/*
 * @Author: djw
 * @Description: 问题相关
 */
import request from '@/utils/axios'
import { IQuestion, IAnswer, IAnswerList, IFile, Idelete } from '@/types/question'

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

//图片上传
export const uploadImage = (data:IFile) => {
  return request({
    url:`/question/uploadImage`,
    method: 'post',
    data
  })
}


//删除问题
export const deleteQuestion = (data:Idelete) => {
  return request({
    url: `/question/deleteQuestion`,
    method: 'post',
    data
  })
}

//获取问题详情
export const getQuestionDetail = (params:Idelete) => {
  return request({
    url: `/question/getQuestionDetail`,
    method: 'get',
    params
  })
}


//编辑问题
export const updateQuestion = (data:IQuestion) => {
  return request({
    url: `/question/updateQuestion`,
    method: 'post',
    data
  })
}


