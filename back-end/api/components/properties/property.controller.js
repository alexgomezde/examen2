//Requerimos el modelo  de usuarios
var Property = require('./property.model.js');
var config = require('../../config/database');



module.exports.save = function(req,res){ //exporta el controlador



        var newProperty = new Property({
          ownedby:req.body.ownedby
        });

        newProperty.save(function(err){
          if(err){
            res.json({success:false,msg:'Player already exists.'});
          }else {
            res.json({success:true,msg:'New player added.'});
          }
        });



}



module.exports.findAll = function(req,res){
  Property.find().then(function(properties){
    res.send(properties);
  });
};
//
// module.exports.remove = function(req,res){
//   console.log(req.body.id);
//   Player.findByIdAndRemove({_id:req.body.id}).then(function(data){
//     res.json({success:true,msg:'Player has been removed.'});
//   });
//
// }
module.exports.update = function(req,res){
  console.log(req.body.id);
  Property.findByIdAndUpdate(req.body._id,{$set:req.body}).then(function(data){
    res.json({success:true,msg:'Owner has been updated.'});
  });

}
