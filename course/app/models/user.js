/*
 * @Author: djw
 * @Description: user数据模型
 */
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  userId: {
    type: String,
    unique: true,
    require: true
  },
  account: {
    type: String,
    require: true
  },
  password:{
    type: String,
    require: true
  },
  avator:{
    type: String
  }
}, { collection: 'user', versionKey: false})

module.exports = mongoose.model('user', userSchema)