 (function() {
  'use strict';

  angular.module('game').controller('LoginController', LoginController);

  LoginController.inject = ['LoginService'];

  /**
   * Creates login controllers for allowing a user to log in to their account.
   * @param {function} LoginService the service containing login and logout functions
   * @return {void}
   */
  function LoginController(LoginService){

    let vm = this;

    vm.userLogin = {};

  /**
  * Allows a user to log in to their account.
  * @param  {Object} userLogin must contain {email: x@x.com, password: ***}
  * @return {void}
  */
    vm.login = function login(userLogin){
      LoginService.login(userLogin.email, userLogin.password)
      .then(function testLog(){
        console.log(userLogin);
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
