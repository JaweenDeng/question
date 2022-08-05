/*
 * @Author: djw
 * @Description: 回答模型
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const answerSchema = new Schema({
  id:{
    type: String,
    unique: true,
    require: true
  },
  userId: {
    type: String,
    require: true
  },
  content:{
    type: String,
    require: true
  },
  questionId:{
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
}, {collection: 'answer', versionKey: false})

module.exports = mongoose.model('answer', answerSchema)