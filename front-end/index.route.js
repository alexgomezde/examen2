(function(){
  angular
    .module('gameApp')
    .config(configuration)
    .controller('tabCtrl' , tabCtrl);

    function configuration($stateProvider, $urlRouterProvider){ //stateProvider
    $stateProvider
    .state('administrator',{
      url: '/administrator',
      templateUrl: 'components/administrator/administrator.view.html',
      controller: 'administradorController',
      controllerAs: 'administradorCtrl'
    })
    .state('administrator.player',{
      templateUrl: 'components/administrator/players/player.view.html',
      controller: 'playerController',
      controllerAs: 'playerCtrl'
    })
    .state('administrator.property',{
      templateUrl: 'components/administrator/properties/property.view.html',
      controller: 'propertyController',
      controllerAs: 'propertyCtrl'
    })

        $urlRouterProvider.otherwise('/administrator');

    }

})();
