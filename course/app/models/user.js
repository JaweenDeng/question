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
    type: String
  },
  password:{
    type: String
  }
}, { collection: 'user', versionKey: false})

module.exports = mongoose.model('user', userSchema)