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
        console.log(response.data);
        return response.data;
      });
    }

    function getCardPick(){
      let fakeObj = {
      accuracy:2,
      accuracy_buff:1,
      attack_buff:1,
      cleanse:1,
      defense:20,
      energy:10,
      energy_debuff:2,
      food_name:'Ravioli',
      health:25,
      health_buff:0,
      id:1,
      klass:'Salty',
      physical_resistance_debuff:2,
      salt:10,
      strength:7,
    };

    return fakeObj;

    }

    return {
      getCardPick: getCardPick,
      getAllCards: getAllCards,
      getOneCard: getOneCard
    };

  }
}());
