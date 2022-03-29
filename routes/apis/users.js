// users 请求

// login  register
const express = require('express')
// 通过exprss路由创建请求分发
const router = express.Router()
// jwt
const jwt = require('jsonwebtoken')

// 加密包
const bcrypt = require('bcrypt')
const gravatar = require('gravatar')

const passport = require('passport')
// 数据模型
const User = require('../../models/User')
// secret key
const keys = require('../../config/keys')
// $route GET
// #desc 返回请求的接口数据
// router.get("/test", (req, res) => {
//   res.json({ msg: "login works" });
// });

// register
router.post('/register', (req, res) => {
  // console.log(req.body);
  // 查询是否存在用户
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: '邮箱已经注册' })
    } else {
      const avatar = gravatar.url('emerleite@gmail.com', {
        s: '200',
        r: 'pg',
        d: 'mm',
      })
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password,
        identity: req.body.identity,
      })
      // 将密码加密后进行存储
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          // Store hash in your password DB.
          if (err) throw err
          newUser.password = hash
          newUser
            .save() // 存储
            .then((user) => res.json(user))
            .catch((err) => console.log(err))
        })
      })
    }
  })
})

/**
 * lgoin
 */
router.post('/login', (req, res) => {
  console.log(req.body)
  const { email, password } = req.body
  // 查询数据库
  User.findOne({
    email,
  }).then((user) => {
    console.log(user)
    if (!user) {
      return res.status(404).json({ success: false, msg: '用户不存在' })
    }
    // 密码匹配
    bcrypt.compare(password, user.password).then((result) => {
      console.log(result)
      if (result) {
        // 用户名、密码正确
        // jwt.sign('规则','加密名字','过期时间','箭头函数')
        const rule = {
          id: user.id,
          name: user.name,
          avatar: user.avatar,
          identity: user.identity,
        }
        // settings jwt
        jwt.sign(rule, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
          res.json({ success: true, token: 'Bearer ' + token })
        })
        // return res.status(200).json({success:true,msg:'用户密码正确'})
      } else {
        return res.status(200).json({ success: false, msg: '密码不正确' })
      }
    })
  })
})

// Private
// 拿到数据之前验证token
// 使用passport-jwt进行验证token
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    console.log(req)
    res.json({
      id: req.user.id,
      email: req.user.email,
      name: req.user.name,
      identity: req.user.identity,
    })
  }
)
module.exports = router
