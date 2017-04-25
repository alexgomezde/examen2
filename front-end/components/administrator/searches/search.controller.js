(function(){
  angular
    .module('gameApp')
    .controller('searchController', searchController);
    function searchController(administradorService){ //se inyecta el service userService en el controlador para que se tenga acceso
      //controlador
      var searchCtrl = this; //binding del controlador con el html, solo en el controlador

      function init(){ // función que se llama así misma para indicar que sea lo primero que se ejecute
        administradorService.getPlayers()
          .success(function(data){
            searchCtrl.players = data;

          });

        administradorService.getProperties()
          .success(function(data){
            searchCtrl.properties = data;

          });
      }init();



    }
})();
