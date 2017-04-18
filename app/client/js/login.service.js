(function() {
  'use strict';

  angular.module('game').factory('LoginService', LoginService);

    LoginService.$inject = ['$http'];

  function LoginService(){

    let token = localStorage.getItem('token');

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

    function logout() {
      return $http({
        url: '/api/users',
        method: 'POST',
        header: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })
      .then(function handleResponse(response) {
        token = null;
        localStorage.removeItem('token');
      });

    }

    function getToken() {
      return token;
    }

    return {
      getToken: getToken,
      sendLogin: sendLogin,
      logout: logout
    };

  }

}());
