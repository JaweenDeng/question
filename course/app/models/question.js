/*
 * @Author: djw
 * @Description: 问题数据模型
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const questionSchema = new Schema({
  id:{
    type: String,
    unique: true,
    require: true
  },
  userId: {
    type: String,
    require: true
  },
  name:{
    type: String,
    require: true
  },
  des:{
    type: String,
  },
  createTime:{
    type: String,
    require: true
  },
  userName:{
    type: String,
    require: true
  }
}, {collection: 'question', versionKey: false})

module.exports = mongoose.model('question', questionSchema)