(function() {
  'use strict';

  angular.module('game').factory('LoginService', LoginService);

    LoginService.$inject = ['$http'];

  function LoginService(){

    function sendLogin(email, password) {
      return $http({
        url: '/api/users',
        method: 'POST',
        header: {
          'Content-Type': 'application/json',
        },
        data: {
          email: email,
          password: password,
        }
      })
      .then(function handleResponse(response) {
        localStorage.setItem('token', respsonse.data.auth_token);//auth_token
        token = response.data.auth_token;
        return token;
      });
    }


    return {
      sendLogin: sendLogin
    };



  }

}());
