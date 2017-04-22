var JwtStrategy = require('passport-jwt').Strategy;
var Player = require('../models/player.model');
var config = require('../config/database');

module.exports = function(passport){
  var opts = {};
  opts.secretOrKey = 'ksk';
  passport.use(new JwtStrategy(opts,function(jwt_payload,done){

    Player.find({id:jwt_payload.sub},function(err,player){
      if(err){
        return done(err,false);
      }
      if(player){
        done(null,player);
      }else{
        done(null,false);
      }
    });
};
