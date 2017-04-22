(function(){
  angular
    .module('gameApp')
    .controller('administradorController', administradorController);
    function administradorController(administradorService,  $scope, $mdSidenav){ //se inyecta el service userService en el controlador para que se tenga acceso
      //controlador
      var administradorCtrl = this; //binding del controlador con el html, solo en el controlador

    $scope.toggleLeft = buildToggler('left');
    $scope.toggleRight = buildToggler('right');

    function buildToggler(componentId) {
      return function() {
        $mdSidenav(componentId).toggle();
      };
    }

      function init(){ // función que se llama así misma para indicar que sea lo primero que se ejecute


      }init();



    }
     //se establece un objeto de angular normal

})();
