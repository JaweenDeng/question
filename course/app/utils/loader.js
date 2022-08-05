/*
 * @Author: djw
 * @Description: 上传
 */
const multer = require('@koa/multer')
const path = require('path')
//上传文件存放路径、及文件命名
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname ,'../../static/images'))
  },
  filename: function (req, file, cb) {
    let type = file.originalname.split('.')[1]
    cb(null, `${Date.now().toString(16)}.${type}`)
  }
})
const upload = multer({storage})

module.exports = {
  upload:upload
}