const express =require('express'); 
const router = express.Router()

// 当访问内部数据时，进行身份校验
// 身份校验
const passport= require('passport') 
// Profile数据模型
const Profile = require('../../models/Profile')

// @route GET api/profile/test
// @desc 返回请求的json数据
// @access public
router.get('/api/profile/test', (req, res)=>{
  res.json({msg:'profile works'})
})

router.get('/api/profiles',(req, res)=>{

})

module.exports = router