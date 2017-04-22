(function(){
  angular
    .module('gameApp')
    .controller('playerController', playerController);
    function playerController(administradorService, $scope, $mdDialog, ImageService, Upload){ //se inyecta el service userService en el controlador para que se tenga acceso
      //controlador
      var playerCtrl = this; //binding del controlador con el html, solo en el controlador

      playerCtrl.cloudObj = ImageService.getConfiguration();

      function init(){ // función que se llama así misma para indicar que sea lo primero que se ejecute

        administradorService.getPlayers()
          .success(function(data){
            playerCtrl.players = data;

          });

      }init();

      playerCtrl.preSave = function(valid){


        if (valid) {

          playerCtrl.cloudObj.data.file = document.getElementById("photo").files[0];
          Upload.upload(playerCtrl.cloudObj)
            .success(function(data){
              playerCtrl.save(data.url);
            });
        }else {

          $mdDialog.show(
            $mdDialog.alert()
            .clickOutsideToClose(true)
            .title('¡Por favor complete los campos requeridos!')
            .textContent('')
            .ariaLabel('Left to right demo')
            .ok('OK')
          );

        }

      }


      playerCtrl.save = function (pPhoto){


            var newPlayer = {
              name : playerCtrl.name,
              id : playerCtrl.id,
              alias : playerCtrl.alias,
              money : '1000',
              photo : pPhoto
            }

            administradorService.setPlayers(newPlayer)
            .success(function(data){
              console.log(data);

              $mdDialog.show(
                $mdDialog.alert()
                .clickOutsideToClose(true)
                .title(data.msg)
                .textContent('')
                .ariaLabel('Left to right demo')
                .ok('OK')
              );

            playerCtrl.name = '';
            playerCtrl.id = '';
            playerCtrl.alias = '';
            init();

        })

        }
      playerCtrl.eliminarCarrera = function (id, ev){


            confirm = $mdDialog.confirm()
          .title('¿Está seguro de que desea eliminar la carrera seleccionada?')
          .textContent('')
          .ariaLabel('Lucky day')
          .targetEvent(ev)
          .ok('Sí')
          .cancel('No');

          $mdDialog.show(confirm).then(function() {
            administradorService.eliminarCarrera(id)
            .success(function(data){
              init();
            })

            $mdDialog.show(
              $mdDialog.alert()
              .clickOutsideToClose(true)
              .title('¡La carrera fue eliminada del sistema!')
              .textContent('')
              .ariaLabel('Left to right demo')
              .ok('OK')
            );
          });


      }

    }

})();
