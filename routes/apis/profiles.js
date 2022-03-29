const express = require('express')
const router = express.Router()

// 当访问内部数据时，进行身份校验
// 身份校验
const passport = require('passport')
// Profile数据模型
const Profile = require('../../models/Profile')
const { route } = require('./users')

// @route GET api/profile/test
// @desc 返回请求的json数据
// @access public
router.get('/test', (req, res) => {
  res.json({ msg: 'profile works' })
})

// @route POST api/profile/add
// @desc 创建信息接口
// @access Private
// 私有接口验证token
router.post(
  '/add',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    console.log('-------------------------------------->=====>>>')
    const profileFields = {}
    if (req.body.type) {
      profileFields.type = req.body.type
    }
    if (req.body.describe) {
      profileFields.describe = req.body.describe
    }
    if (req.body.incode) {
      profileFields.incode = req.body.incode
    }
    if (req.body.expend) {
      profileFields.expend = req.body.expend
    }
    if (req.body.cash) {
      profileFields.cash = req.body.cash
    }
    if (req.body.remark) {
      profileFields.remark = req.body.remark
    }
    new Profile(profileFields).save().then((profile) => {
      console.log(profile)
      res.json(profile)
    })
  }
)

// @route GET api/profile/
// @desc 获取创建的所有profile
// @access Private
// 私有接口判断jwt
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.find()
      .then((profile) => {
        if (profile) {
          res.json(profile)
        }
      })
      .catch(() => {
        res.status(404).json({ message: '查找profile失败' })
      })
  }
)

// @desc 获取单个profile
// @route GET api/profile/:id
// @access Private
router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ _id: req.params.id })
      .then((profile) => {
        if (!profile) {
          return res.status(404).json('没有任何内容')
        }
        res.json(profile)
      })
      .catch((err) => res.status(404).json(err))
  }
)

// @desc 编辑单个profile
// @route POST api/profile/edit/:id
// @access Private
router.post(
  '/edit/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const profileFields = {}
    console.log(req.body)
    if (req.body.type) {
      profileFields.type = req.body.type
    }
    if (req.body.describe) {
      profileFields.describe = req.body.describe
    }
    if (req.body.incode) {
      profileFields.incode = req.body.incode
    }
    if (req.body.expend) {
      profileFields.expend = req.body.expend
    }
    if (req.body.cash) {
      profileFields.cash = req.body.cash
    }
    if (req.body.remark) {
      profileFields.remark = req.body.remark
    }
    console.log(profileFields)
    Profile.findOneAndUpdate(
      { _id: req.params.id },
      { $set: profileFields },
      { new: true }
    )
      .then((profile) => {
        res.json(profile)
      })
      .catch((err) => res.status(500).json(err))
  }
)


// @desc 删除单个profile
// @route DELETE api/profile/:id
// @access Private
router.delete(
  '/delete/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // findOneAndRemove
    Profile.deleteOne({ _id: req.params.id })
      .then((result) => {
        console.log('---->delete result=====>')
        if (!result) {
          return res.status(404).json('删除失败')
        }
        res.json({message: result})
      })
      .catch((err) => res.status(404).json(err))
  }
)
module.exports = router
