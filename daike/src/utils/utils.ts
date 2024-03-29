/*
 * @Author: djw
 * @Description: 工具方法
 */
export const changeTime = (timestamp:number):string => {
  const date = new Date(timestamp * 1000);

  const Y = date.getFullYear()

  const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'

  const D = date.getDate() + ' '

  const h = date.getHours() + ':'

  const m = date.getMinutes() + ':'

  const s = date.getSeconds()

  return `${Y}-${M}-${D} ${h}:${m}:${s}`
}