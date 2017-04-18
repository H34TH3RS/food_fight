(function() {
  'use strict';
  angular.module('game').controller('UserController', UserController);

  UserController.$inject = ['$state', 'UserService'];

  /**
   * creates the user controller
   * @param {function} $state  the service for routing views
   * @param {function} UserService the service containing user functions
   */
  function UserController($state, UserService) {

      let vm = this;

      vm.users = [];
      vm.user = {};

      vm.createUser = function createUser(user) {
        console.log('inside create user controller', user);
        return UserService.createUser(user)
        .then(function goHome() {
          $state.go('home');
        })
        .catch();
      };
    }

}());
