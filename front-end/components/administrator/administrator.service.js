(function(){
  angular
  .module('gameApp')
  .service('administradorService', administradorService);

  function administradorService($http){


    var publicAPI = {
      setPlayers : _setPlayers,
      getPlayers : _getPlayers,
      getProperties : _getProperties,
      eliminarCarrera : _eliminarCarrera,
      eliminarCurso : _eliminarCurso,
      updatePlayer : _updatePlayer,
      calculateMoney : _calculateMoney,
      updateOwner : _updateOwner
    };
    return publicAPI; // todas las funciones que sean llamadas por ajax deben estar debajo del return, para que cuando angular corra el script haga el return y devuelva el api , las funciones debajo del return son privadas y se devuelve el api que es el que contiene las funciones



    function _setPlayers(pNewPlayer){
      //users.push(pUser);
      return $http.post('http://localhost:8000/api/players', pNewPlayer);
    }

    function _getPlayers(){
      return $http.get('http://localhost:8000/api/players');
    }

    function _getProperties(){
      return $http.get('http://localhost:8000/api/properties');
    }


    function _eliminarCarrera(id) {
      return $http.delete('http://localhost:8000/api/carreras/' + id);
    }

    function _eliminarCurso(id) {
      return $http.delete('http://localhost:8000/api/cursos/' + id);
    }

    function _updatePlayer(pPlayer) {
      return $http.put('http://localhost:8000/api/players',pPlayer);
    }

    function _calculateMoney(pPlayersMoney, pPropertysPrice) {

      var availableMoney = pPlayersMoney - pPropertysPrice;
      return availableMoney;
    }

    function _updateOwner(pProperty) {
      return $http.put('http://localhost:8000/api/properties',pProperty);
    }





  }

})();
