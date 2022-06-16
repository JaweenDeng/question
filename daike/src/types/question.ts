/*
 * @Author: djw
 * @Description: 问题相关接口
 */
import { IPage } from './common'
export interface IQuestion {
  name:String,
  des?:String
}

export interface IAnswer {
  content:String,
  id:String
}

export interface IAnswerList extends IPage{
  id:String
}