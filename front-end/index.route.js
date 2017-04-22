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
    .state('administrator.curso',{
      templateUrl: 'components/administrator/cursos/curso.view.html',
      controller: 'cursoController',
      controllerAs: 'cursoCtrl'
    })

        $urlRouterProvider.otherwise('/administrator');

    }

})();
