(function() {
  'use strict';

  angular.module('game').controller('UserController', UserController);

  UserController.$inject = ['$state', 'UserService'];

  /**
  * Creates User Controllers
  * @param {function} $state  The service for routing views.
  * @param {function} UserService The service containing user functions.
  */
  function UserController($state, UserService) {

    let vm = this;

    vm.users = [];
    vm.user = {};
    vm.userLogin = {};
    vm.message = null;
    vm.hasError = false;

    /**
    * Allows a user to log in to their account.
    * @param  {Object} userLogin must contain {email: x@x.com, password: ***}
    * @return {void}
    */
    vm.login = function login(userLogin){

      if (!userLogin.email || !userLogin.password) {
        return Promise.reject();
      }

      UserService.login(userLogin.email, userLogin.password)
      .then(function goToHome() {
        $state.go('home');
      })
      .catch(function handleError(err) {
        vm.hasError = true;
        if (err.status === 401) {
          vm.message = 'Unable to log in. Page not found.';
          // use $state.go('not-found') instead of message on the page?
        } else {
          vm.message = 'Unable to log in. Page not found.';
        }
      });
    };

    /**
    * Removes the token to log out a user from the website.
    * @return {void}
    */
    vm.logout = function logout() {
      UserService.logout();
      $state.go('home');
    };

    /**
    * If the user is logged in, this changes the truthy value to true.
    * @return {Boolean}
    */
    vm.loggedIn = function loggedIn(){
      return !!UserService.getToken();
    };

    /**
    * Creates a new user account.
    * @param  {Object} user The user account information.
    *                       Must contain {email: string, username: string,
    *                       password: string, password_confirmation: string}
    * @return {Promise}
    */
    vm.createUser = function createUser(user) {
      return UserService.createUser(user)
      .then(function goHome() {
        $state.go('login');
      })
      .catch(function handleError(err) {
        vm.hasError = true;
        if (err.status === 401) {
          vm.message = 'Unable to create a new user. Page not found.';
          // use $state.go('not-found') instead of message on the page?
        } else {
          vm.message = 'Unable to create a new user. Page not found.';
        }
      });
    };

  }

}());
