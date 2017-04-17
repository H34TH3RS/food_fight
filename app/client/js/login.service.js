(function() {
  'use strict';

  angular.module('game').factory('LoginService', LoginService);

    LoginService.$inject = ['$http'];
    
  function LoginService(){

    function sendLogin(email, password) {
      return $http({
        url: '',
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
        localStorage.setItem('token', respsonse.data.id);
        token = response.data.id;
        return token;
      });
    }


    return {
      sendLogin: sendLogin
    };



  }

}());
