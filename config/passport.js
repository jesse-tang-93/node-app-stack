/**
 * jwt身份验证
 */
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

const mongoose = require('mongoose')  
// 关联user表
const User = mongoose.model("users")  
const keys = require('../config/keys')
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;


// opts.issuer = 'accounts.examplesoft.com';
// opts.audience = 'yoursite.net';

module.exports = passport => {
  passport.use(new JwtStrategy(opts,(jwt_payload,done)=>{
    // User.findOne({id:jwt_payload.sub},(err,user)=>{
    //   if(err){
    //     return done(err, false)
    //   }
    //   if(user){
    //     return done(null, user)
    //   }
    // })
    console.log(jwt_payload)
    User.findById(jwt_payload.id).then(user=>{
      if(user){
        return done(null, user)
      }
      return done(null, false)
    }).catch(err=> console.log(err))
    
  }))
}