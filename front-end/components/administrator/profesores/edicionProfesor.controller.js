(function(){
  angular
    .module('gameApp')
    .controller('edicionProfesorController', edicionProfesorController);
    function edicionProfesorController(administradorService){ //se inyecta el service userService en el controlador para que se tenga acceso
      //controlador
      var edicionProfesorCtrl = this; //binding del controlador con el html, solo en el controlador

      function init(){ // función que se llama así misma para indicar que sea lo primero que se ejecute
        edicionProfesorCtrl.profesores = administradorService.getProfesores();
      }init();

      edicionProfesorCtrl.save = function (){
        var nuevoProfesor = {
          nombreProfesor : edicionProfesorCtrl.nombreProfesor,
          correoProfesor : edicionProfesorCtrl.correoProfesor,
          contrasennaProfesor : edicionProfesorCtrl.contrasennaProfesor,
          tipo : 'profesor'
        }
        administradorService.setProfesores(nuevoProfesor);
        // inicioSesionService.setUsuarios(nuevoProfesor);
        console.log(nuevoProfesor);
        alert(nuevoProfesor);
      }


    }

})();
