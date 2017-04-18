(function() {
  'use strict';

  angular.module('game').factory('LoginService', LoginService);

    LoginService.$inject = ['$http'];

  /**
   * Creates the login service for loging in and out with an authorization token
   * @return {Object} the object containing funcitons for use in the login controller
   */
  function LoginService(){

    let token = localStorage.getItem('token');

    /**
     * Retrieves an auth token to allow the user to log in to their account.
     * @param  {String} email    the user's email address
     * @param  {String} password the user's password
     * @return {String}          the authorization token
     */
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

    /**
     * Removes the authorization token to log out the user
     * @return {function} the ajax call to remove the token
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
      sendLogin: sendLogin,
      logout: logout
    };

  }

}());
