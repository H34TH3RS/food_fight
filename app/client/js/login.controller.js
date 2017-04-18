(function() {
  'use strict';

  angular.module('game').controller('LoginController', LoginController);

  LoginController.inject = ['$state', 'LoginService'];

  /**
   * Creates login controllers for allowing a user to log in to their account.
   * @param {function} LoginService the service containing login and logout functions
   * @return {void}
   */
  function LoginController($state, LoginService){

    let vm = this;

    vm.userLogin = {};

  /**
  * Allows a user to log in to their account.
  * @param  {Object} userLogin must contain {email: x@x.com, password: ***}
  * @return {void}
  */
    vm.login = function login(userLogin){
      LoginService.login(userLogin.email, userLogin.password)
      .then(function goToHome(){
        $state.go('home');
      })
      .catch(function handleError(err) {
        console.warn('Unable to log in', err);
      });
    };

  /**
   * Removes the token to log out a user from the website.
   * @return {void}
   */
    vm.logout = function logout() {
      LoginService.logout();
    };
  }

}());
