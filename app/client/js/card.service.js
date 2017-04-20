(function() {
  'use strict';
  angular.module('game').factory('CardService', CardService);

  CardService.$inject = ['$http', 'UserService'];


  /**
   * Creates the Card Service
   * @param {Function} $http       Service that allows ajax calls
   * @param {Function} UserService Contains the function to retrieve the auth token
   */
  function CardService($http, UserService) {

    function getAllCards() {
      return $http({
        url: '/api/cards',
        method: 'GET',
        headers: {
          'Authorization': UserService.getToken()
        }
      })
      .then(function handleResponse(response) {
        return response.data;
      });
    }

    return {
      getAllCards: getAllCards
    };

  }
}());
