(function() {
  'use strict';
  angular.module('game').controller('UserController', UserController);

  UserController.$inject = ['$state', 'UserService'];

  function UserController($state, UserService) {

      let vm = this;

      vm.users = [];
      vm.user = {};

      vm.createUser = function createUser(user) {
        return UserService.createUser(user)
        .then(function goHome() {
          $state.go('home');
        })
        .catch();
      };
    }

}());
