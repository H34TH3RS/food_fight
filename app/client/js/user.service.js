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

    let token  = localStorage.getItem('token');

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
        },
        data: {
          user: {
            email: user.email,
            username: user.username,
            password: user.password,
            password_confirmation: user.password_confirmation
          }
        }
      })
      .then(function handleResponse(response) {
        return response.data;
      });
    }
    /**
     * Retrieves an auth token to allow the user to log in to their account.
     * @param  {String} email    the user's email address
     * @param  {String} password the user's password
     * @return {Promise}          the authorization token
     */
    function login(email, password) {
      return $http({
        url: '/api/users',
        method: 'POST',
        header: {
          'Content-Type': 'application/json',
        },
        data: {
          user: {
            email: email,
            password: password
          }
        }
      })
      .then(function handleResponse(response) {
        localStorage.setItem('token', respsonse.data.auth_token);//auth_token
        token = response.data.auth_token;
        return token;
      });
    }

    /**
     * Removes the authorization token to log out the user
     * @return {Promise} the ajax call to remove the token
     */
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

    /**
     * Retrieves the token for secure access by the authorization system
     * @return {String} the authorization token
     */
    function getToken() {
      return token;
    }

    return {
      getToken: getToken,
      login: login,
      logout: logout,
      createUser: createUser

    };

  }
}());
