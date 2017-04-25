//Requerimos el modelo  de usuarios
var Player = require('./player.model.js');
var config = require('../../config/database');


module.exports.save = function(req,res){ //exporta el controlador



        var newPlayer = new Player({
          name:req.body.name,
          id:req.body.id,
          alias:req.body.alias,
          money:req.body.money,
          photo:req.body.photo,
          file:req.body.file
        });

        newPlayer.save(function(err){
          if(err){
            res.json({success:false,msg:'Player already exists.'});
          }else {
            res.json({success:true,msg:'New player added.'});
          }
        });



}

module.exports.findAll = function(req,res){
  Player.find().then(function(players){
    res.send(players);
  });
};
//
module.exports.remove = function(req,res){
  console.log(req.body.id);
  Player.findByIdAndRemove({_id:req.body.id}).then(function(data){
    res.json({success:true,msg:'Player has been removed.'});
  });

}
module.exports.update = function(req,res){
  console.log(req.body.id);
  Player.findByIdAndUpdate(req.body._id,{$set:req.body}).then(function(data){
    res.json({success:true,msg:'Player has been updated.'});
  });

}
