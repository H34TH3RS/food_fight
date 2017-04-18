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
      vm.message = null;
      vm.hasError = false;

      vm.createUser = function createUser(user) {
        console.log('inside create user controller', user);
        return UserService.createUser(user)
        .then(function goHome() {
          $state.go('home');
        })
        .catch(function handleError(err) {
          vm.hasError = true;
          if (err.status === 404) {
            vm.message = 'Unable to create a new user. Page not found.';
            // use $state.go('not-found') instead of message on the page?
          } else {
            vm.message = 'There is a problem with the server. Please try again later.';
          }
        });
      };
    }

}());
