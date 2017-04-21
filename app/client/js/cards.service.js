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
          'Content-Type': 'application/json'
        }
      })
      .then(function handleResponse(response) {
        return response.data;
      });
    }

    function getOneCard(upc) {
      return $http({
        url: '/api/cards',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          upc: upc.upc
        }
      })
      .then(function handleResponse(response) {
        console.log(response.data);
        return response.data;
      });

    }

    return {
      getAllCards: getAllCards,
      getOneCard: getOneCard
    };

  }
}());
