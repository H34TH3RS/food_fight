(function() {
  'use strict';

  angular.module('game').controller('LoginController', LoginController);

  LoginController.inject = ['LoginService'];

  function LoginController(LoginService){

    let vm = this;

    vm.userLogin = {};

    vm.login = function login(userLogin){
      LoginService.login(userLogin.email, userLogin.password)
      .then(function testLog(){
        console.log(userLogin);
      });
    };

  }

}());
