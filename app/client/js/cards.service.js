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

    function getAllCards(upc) {
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
        console.log(response.data);
        return response.data;
      });
    }

    // function getOneCard(upc) {
    //   return $http({
    //     url: '/api/card_assignments',
    //     method: 'GET',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Authorization': token
    //     },
    //     data: {
    //       upc: upc
    //     }
    //   })
    //   .then(function handleResponse(response) {
    //     let card = response.data;
    //     let last = (card.length - 1);
    //     console.log('getoNE', card[last]);
    //     console.log('getoNE', card[last].health); //this is right
    //     console.log('getoNE', card[last].id);  //this is right
    //     let cardObj = {
    //         accuracy:card[last].accuracy,
    //         accuracy_buff:card[last].accuracy_buff,
    //         attack_buff:card[last].attack_buff,
    //         cleanse:card[last].cleanse,
    //         defense:card[last].defense,
    //         energy:card[last].energy,
    //         energy_debuff:card[last].energy_debuff,
    //         food_name:card[last].food_name,
    //         health:card[last].health,
    //         health_buff:card[last].health_buff,
    //         id:card[last].id,
    //         klass:card[last].klass,
    //         physical_resistance_debuff:card[last].physical_resistance_debuff,
    //         salt:card[last].salt,
    //         strength:card[last].strength,
    //       };
    //       console.log(cardObj);
    //     return cardObj;
    //   });
    // }

    //this will pull card data from UPC service??
    // function getCardPick(){
    //   let fakeObj = {
    //   accuracy:2,
    //   accuracy_buff:1,
    //   attack_buff:1,
    //   cleanse:1,
    //   defense:20,
    //   energy:10,
    //   energy_debuff:2,
    //   food_name:'Ravioli',
    //   health:25,
    //   health_buff:0,
    //   id:1,
    //   klass:'Salty',
    //   physical_resistance_debuff:2,
    //   salt:10,
    //   strength:7,
    // };
    //
    // return fakeObj;
    //
    // }

    function getLastCard(upc){
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
        console.log(cards);
        return cards;
      });
    }






    return {
      getLastCard: getLastCard,
      // getCardPick: getCardPick,
      getAllCards: getAllCards,
      // getOneCard: getOneCard
    };

  }
}());
