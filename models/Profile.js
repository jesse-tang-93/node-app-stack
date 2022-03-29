/**
 * profile 数据模型
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProfileSchema = new Schema({
  type: {
    type: String,
  },
  describe: {
    type: String,
  },
  // 收入
  incode: {
    type: String,
    required: true,
  },
  // 支出
  expend: {
    type: String,
    required: true,
  },
  // 现金
  cash: {
    type: String,
    required: true,
  },
  // 备注
  remark: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

// 创建user表
module.exports = Profile = mongoose.model('profile', ProfileSchema)
