var GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport=require("passport");
const jwt = require("jsonwebtoken");
const { UserModel } = require('./models/user.model');
require("dotenv").config();


passport.use(new GoogleStrategy({
    clientID: "596580197394-12srjv3krqcmt44sieo7q9pa8tp39q0n.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://127.0.0.1:3000/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile, cb) {
    let euser=await UserModel.findOne({email:profile.emails[0].value});
    if(euser){
      let token=jwt.sign({"_id":euser._id},process.env.secret);
      profile["t"]=token;
    }else{
      let nuser= new UserModel({email:profile.emails[0].value,name:profile.name.givenName})
      await nuser.save();
      euser=await UserModel.findOne({email:profile.emails[0].value});
      let token=jwt.sign({"_id":euser._id},process.env.secret);
      profile["t"]=token;
    }
    
    module.exports={
      profile
    }
     function User(err, user) {
      return cb(err, user);
    }
    User()
    
  }
));
  

module.exports={passport}