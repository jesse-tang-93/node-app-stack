const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

const mongoose = require('mongoose')  
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
    User.findById(jwt_payload.id)
    console.log(jwt_payload)
  }))
}