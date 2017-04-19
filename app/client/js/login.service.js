(function() {
  'use strict';

  angular.module('game').factory('LoginService', LoginService);

    LoginService.$inject = ['$http'];

  /**
   * Creates the login service for loging in and out with an authorization token
   * @return {Object} the object containing funcitons for use in the login controller
   */
  function LoginService($http) {

    let token = localStorage.getItem('token');




  }

}());
