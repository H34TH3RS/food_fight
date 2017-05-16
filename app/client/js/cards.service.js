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

    /**
    * Gets all the cards from the api, then gets the last object inside.
    * @param  {String} upc  The UPC obtained from user input.
    * @return {Promise}
    */
    function getOneCard(upc) {
      console.log(upc);
      return $http({
        url: '/api/card_assignments',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        data: {
          upc: upc
        }
      })
      .then(function handleResponse(response) {
        let cards = response.data;
        let card = cards[0];
        return card;
      });
    }

    /**
    * Retrieves the all the cards from the api
    * @return {Array}     Tne array containing all card objects for a specific user.
    */
    function getAllCards() {
      return $http({
        url: '/api/card_assignments',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })
      .then(function handleResponse(response) {
        return response.data;
      });
    }

    return {
      getAllCards: getAllCards,
      getOneCard: getOneCard
    };

  }

}());
