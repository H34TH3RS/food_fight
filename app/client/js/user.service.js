(function() {
  'use strict';

  angular.module('game').factory('UserService', UserService);

  UserService.$inject = ['$http'];

  /**
   * Creates the user service
   * @param {function} $http the service for ajax calls
   * @return {Object} contains functions for use in the user controller
   */
  function UserService($http) {

    /**
     * Creates a new user account
     * @param  {Object} user must contain {email: xxx, username: xxx, password: xxx, password_confirmation: xxx}
     * @return {void}
     */
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
      });
    }

    return {
      createUser: createUser
    };

  }
}());
