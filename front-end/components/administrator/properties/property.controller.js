(function(){
  angular
    .module('gameApp')
    .controller('propertyController', propertyController);
    function propertyController(administradorService, $scope, $mdDialog){ //se inyecta el service userService en el controlador para que se tenga acceso
      //controlador
      var propertyCtrl = this; //binding del controlador con el html, solo en el controlador

      function init(){ // función que se llama así misma para indicar que sea lo primero que se ejecute
        administradorService.getPlayers()
          .success(function(data){
            propertyCtrl.players = data;

          });

        administradorService.getProperties()
          .success(function(data){
            propertyCtrl.properties = data;

          });

      }init();

      propertyCtrl.buy = function(valid) {

        if (valid) {

          var foundOwner = false;

          var propertiesArray = propertyCtrl.properties;


          for (var y in propertiesArray) {
            if (propertiesArray.hasOwnProperty(y)) {
              var temProperty = propertiesArray[y];
              if (temProperty._id === propertyCtrl.property) {
                var numberID = Number(temProperty.ownedby);
                if ( numberID != -1) {
                  var foundOwner = true;
                  break;
                }
              }
            }
          }


          if (foundOwner) {

            $mdDialog.show(
              $mdDialog.alert()
              .clickOutsideToClose(true)
              .title('Too late! the property has been already taken')
              .textContent('')
              .ariaLabel('Left to right demo')
              .ok('OK')
            );

          }else {

            for (var key in propertyCtrl.players) {
              if (propertyCtrl.players.hasOwnProperty(key)) {
                var tempPlayer = propertyCtrl.players[key];
                if (tempPlayer._id === propertyCtrl.player) {
                  var playerObj = tempPlayer;
                  break;
                }
              }
            }

            for (var x in propertyCtrl.properties) {
              if (propertyCtrl.properties.hasOwnProperty(x)) {
                var tempProperty = propertyCtrl.properties[x];
                if (tempProperty._id === propertyCtrl.property) {
                  var propertyObj = tempProperty;
                  break;
                }
              }
            }

            var playersMoney = playerObj.money;
            var propertysPrice = propertyObj.price;


            if (playersMoney >= propertysPrice) {

              var availableMoney = administradorService.calculateMoney(playersMoney, propertysPrice);

              var newChanges = {
                _id : propertyCtrl.player,
                money : availableMoney
              }

              var updateOwnerId = {
                _id : propertyCtrl.property,
                ownedby : playerObj.id
              }



              administradorService.updatePlayer(newChanges)
              .success(function(data){
                console.log(data);
                init();
              });

              administradorService.updateOwner(updateOwnerId)
              .success(function(data){
                console.log(data);
                init();
              });

              propertyCtrl.player = null;
              propertyCtrl.property = null;


              $mdDialog.show(
                $mdDialog.alert()
                .clickOutsideToClose(true)
                .title('Congratulations on your new property')
                .textContent('')
                .ariaLabel('Left to right demo')
                .ok('OK')
              );


            }else {
              $mdDialog.show(
                $mdDialog.alert()
                .clickOutsideToClose(true)
                .title('Sorry, not enough money')
                .textContent('')
                .ariaLabel('Left to right demo')
                .ok('OK')
              );
            }

          }




        }else {
          $mdDialog.show(
            $mdDialog.alert()
            .clickOutsideToClose(true)
            .title('Please make sure to select a player and a property')
            .textContent('')
            .ariaLabel('Left to right demo')
            .ok('OK')
          );
        }

      }




  }

})();
