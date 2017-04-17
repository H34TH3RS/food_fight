(function() {
  'use strict';

  angular.module('game').factory('UpcService', UpcService);

  UpcService.$inject = ['$http'];

  function UpcService($http) {

    function sendUpcData(data) {
      return $http({
        url: '/api/users',
        method: 'POST',
        header: {
          'Content-Type': 'application/json'
        },
        data: {
          upc: upc
        }

      })
      .then(function handleResponse(response) {
        return response.data;
      })
      .catch();
    }

    function createUser(user) {
      return $http({
        url: '/api/users',
        method: 'POST',
        header: {
          'Content-Type': 'application/json',
          'Authorization': LoginService.getToken()
        },
        data: {
          email: user.email,
          username: user.username,
          password: user.password,
          password_confirmation: user.password_confirmation
        }
      })
      .then(function handleResponse(response) {
        return response.data;
      })
      .catch();
    }

    return {
      sendLogin: sendLogin,
      sendUpcData: sendUpcData,
      createUser: createUser
    };

  }

}());
