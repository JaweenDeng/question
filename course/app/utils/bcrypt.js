/*
 * @Author: djw
 * @Description: bcrypt加密
 */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
//加密数据
const encrtpt = async (password, saltTimes) => {
  const hash = await bcrypt.hash(password, saltTimes);
  return hash; 
}

//检测加密数据
const validate = async (password, hash) => {
  const match = await bcrypt.compare(password, hash);
  return match;
}

//解密token
const getToken = (ctx) => {
  if (ctx.header && ctx.header.authorization) {
    const parts = ctx.header.authorization.split(' ');
    if (parts.length === 2) {
      //取出token
      const scheme = parts[0];
      const token = parts[1];
      const user = jwt.decode(token)
      if(user) {
        return user
      }
    } else {
      return false
    }
  } else {
    return false
  }
  return false
}

module.exports = {
  encrtpt,
  validate,
  getToken
}