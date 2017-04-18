(function() {
  'use strict';

  angular.module('game').factory('UserService', UserService);

  UserService.$inject = ['$http', 'LoginService'];

  /**
   * Creates the user service
   * @param {function} $http the service for ajax calls
   * @return {Object} contains functions for use in the user controller
   */
  function UserService($http, LoginService) {

    /**
     * Creates a new user account
     * @param  {Object} user must contain {email: xxx, username: xxx, password: xxx, password_confirmation: xxx}
     * @return {void}
     */
    function createUser(user) {
      console.log('inside create user service');
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
        console.log('in .then of create user service');
        return response.data;
      })
      .catch();
    }

    return {
      createUser: createUser
    };

  }
}());
