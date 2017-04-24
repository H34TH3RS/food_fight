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
      .then(function goToHome(){
        $state.go('home');
      })
      .catch(function handleError(err) {
        vm.hasError = true;
        if (err.status === 404) {
          vm.message = 'Unable to log in. Page not found.';
          // use $state.go('not-found') instead of message on the page?
        } else {
          vm.message = 'There is a problem with the server. Please try again later.';
        }
      });
    };

    /**
    * Removes the token to log out a user from the website.
    * @return {void}
    */
    vm.logout = function logout() {
      UserService.logout();
      console.log('logged out');
      $state.go('home');
    };

    vm.loggedIn = function loggedIn(){
      return !!UserService.getToken();
    };

    vm.createUser = function createUser(user) {
      if (typeof('user') !== 'object' || !user.email || !user.password || !user.password_confirmation || !user.username){
        return Promise.reject();
      }
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
