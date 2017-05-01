(function() {
  'use strict';
  angular.module('game').factory('CardsService', CardsService);

  CardsService.$inject = ['$http', 'UserService', 'UpcService'];


  /**
   * Creates the Card Service
   * @param {Function} $http       Service that allows ajax calls
   * @param {Function} UserService Contains the function to retrieve the auth token
   */
  function CardsService($http, UserService, UpcService) {
    let token = UserService.getToken();
    let fakeObj= [];

    function getAllCards() {
      return $http({
        url: '/api/card_assignments',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })
      .then(function handleResponse(response) {
        return response.data;
      });
    }

    function getOneCard(upc) {
      return $http({
        url: '/api/card_assignments',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        data: {
          upc: upc
        }
      })
      .then(function handleResponse(response) {
        fakeObj = response.data;
        return response.data;
      });
    }

    //this will pull card data from UPC service??
    function getCardPick(){
      return fakeObj;

    }

    return {
      getCardPick: getCardPick,
      getAllCards: getAllCards,
      getOneCard: getOneCard
    };

  }
}());
