

(function() {
    'use strict';

    angular.module('game', ['ui.router'])
    .config(routerConfig);

    routerConfig.$inject = ['$stateProvider'];

    // $urlRouterProvider.when('', '/');
    // $urlRouterProvider.otherwise('/not-found');
 function routerConfig($stateProvider) {

    $stateProvider
    .state({
      name: 'home',
      url: '',
      templateUrl: '/templates/home.template.html'
    })
    .state({
      name: 'login',
      url: '/login',
      templateUrl: 'templates/login.template.html',
      controller: 'LoginController',
      controllerAs: 'loginCtrl'
    })
    .state({
      name: 'create-user',
      url: '/create-user',
      templateUrl: 'templates/create_user.template.html',
      controller: 'UpcController',
      controllerAs: 'upcCtrl'
    });
}

}());
