(function() {
  'use strict';

  angular.module('game').factory('UserService', UserService);

  UserService.$inject = ['$http'];

  /**
  * Creates the user service
  * @param {function} $http The service for AJAX calls.
  * @return {Object} Contains functions for use in the user controller.
  */
  function UserService($http) {

    let token  = localStorage.getItem('token') || null;

    /**
    * Creates a new user account
    * @param  {Object} user The user account information.
    *                     Must contain {email: string, username: string,
    *                     password: string, password_confirmation: string}    *
    * @return {void}
    */
    function createUser(user) {
      return $http({
        url: '/api/users',
        method: 'POST',
        header: {
          'Content-Type': 'application/json',
          'Authorization': token
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
    * @param  {String} email    The user's email address.
    * @param  {String} password The user's password.
    * @return {Promise}         To obtain the authorization token.
    */
    function login(email, password) {
      return $http({
        url: '/api/authorization',
        method: 'POST',
        header: {
          'Content-Type': 'application/json',
        },
        data: {
          email: email,
          password: password
        }
      })
      .then(function handleResponse(response) {
        token = 'token ' + response.data.auth_token;
        localStorage.setItem('token', token);//auth_token
        return token;
      });
    }
    /**
    * Sets the token to null an removes the token from localStorage
    * @return {Void}
    */
    function logout() {
      token = null;
      localStorage.removeItem('token');
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
