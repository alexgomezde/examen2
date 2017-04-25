var express = require('express');
var	router = express.Router();
var propertyController = require('./property.controller.js');

//Para las rutas con id
router.param('id',function(req, res, next, id){
  req.body.id = id;
  next();
});


//Declaracion de las rutas

// router.route('/properties')
//   .post(function(req, res){
//     propertyController.save(req,res);
//  	});

router.route('/properties')
  .get(function(req, res){
    propertyController.findAll(req,res);
  });
// router.route('/carreras/:id')
//   .delete(function(req, res){
//     carreraController.remove(req,res);
//  	});
router.route('/properties')
  .put(function(req, res){
    propertyController.update(req,res);
 	});




// Se exporta el modulo
module.exports = router;
