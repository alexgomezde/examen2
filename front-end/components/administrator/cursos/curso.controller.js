(function(){
  angular
    .module('gameApp')
    .controller('cursoController', cursoController);
    function cursoController(administradorService, $scope, $mdDialog){ //se inyecta el service userService en el controlador para que se tenga acceso
      //controlador
      var cursoCtrl = this; //binding del controlador con el html, solo en el controlador

      function init(){ // función que se llama así misma para indicar que sea lo primero que se ejecute
        administradorService.getCarreras()
          .success(function(data){
            cursoCtrl.carreras = data;

          });

        administradorService.getCursos()
          .success(function(data){
            cursoCtrl.cursos = data;

          });

      }init();

      cursoCtrl.save = function (valido){

        if (valido) {
            var nuevoCurso = {
              codigoCarrera : cursoCtrl.carrera,
              codigoCurso : cursoCtrl.codigo.toUpperCase(),
              nombre : cursoCtrl.nombre
            }

           administradorService.setCursos(nuevoCurso)
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

           cursoCtrl.carrera = '';
           cursoCtrl.codigo = '';
           cursoCtrl.nombre = '';
           init();

       })





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

      cursoCtrl.eliminarCurso = function (id, ev){


            confirm = $mdDialog.confirm()
          .title('¿Está seguro de que desea eliminar el curso seleccionado?')
          .textContent('')
          .ariaLabel('Lucky day')
          .targetEvent(ev)
          .ok('Sí')
          .cancel('No');

          $mdDialog.show(confirm).then(function() {
            administradorService.eliminarCurso(id)
            .success(function(data){
              init();
            })

            $mdDialog.show(
              $mdDialog.alert()
              .clickOutsideToClose(true)
              .title('¡El curso fue eliminado del sistema!')
              .textContent('')
              .ariaLabel('Left to right demo')
              .ok('OK')
            );
          });


      }


  }

})();
