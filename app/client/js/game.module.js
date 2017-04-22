

(function() {
  'use strict';

  angular.module('game', ['ui.router'])
  .config(routerConfig);

  routerConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  function routerConfig($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('', '/');
    $urlRouterProvider.otherwise('/not-found');

    $stateProvider
    .state({
      name: 'home',
      url: '/',
      templateUrl: 'templates/home.template.html'
    })
    .state({
      name: 'login',
      url: '/login',
      templateUrl: 'templates/login.template.html',
      controller: 'UserController',
      controllerAs: 'userCtrl'
    })
    .state({
      name: 'create-user',
      url: '/create-user',
      templateUrl: 'templates/create-user.template.html',
      controller: 'UserController',
      controllerAs: 'userCtrl'
    })
    .state({
      name: 'upc',
      url: '/upc',
      templateUrl: 'templates/upc.template.html',
      controller: 'UpcController',
      controllerAs: 'upcCtrl'
    })
    .state({
      name: 'cards',
      url: '/cards',
      templateUrl: 'templates/cards.template.html',
      controller: 'CardController',
      controllerAs: 'cardCtrl'
    })
    .state({
      name: 'play',
      url: '/play',
      templateUrl: 'templates/play.template.html',
      controller: 'GameController',
      controllerAs: 'gameCtrl'
    })
    .state({
      name: 'end',
      url: '/end',
      templateUrl: 'templates/end.template.html',
      controller: 'GameController',
      controllerAs: 'gameCtrl'
    })
    .state({
      name: 'not-found',
      url: '/not-found',
      templateUrl: 'templates/not-found.template.html',
    });
}

}());
