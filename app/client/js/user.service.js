(function() {
  'use strict';

  angular.module('game').factory('UserService', UserService);

  UserService.$inject = ['$http'];

  function UserService($http) {

    function createUser(user) {
      return $http({
        url: '/api/users',
        method: 'POST',
        header: {
          'Content-Type': 'application/json',
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
      createUser: createUser
    };

  }
}());
